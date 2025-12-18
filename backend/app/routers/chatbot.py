from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect
from sqlalchemy.orm import Session
from typing import List
import json
import uuid

from ..database import get_db
from ..models.chat_message import ChatMessage
from ..services.ai_chat import ai_chat_service
from pydantic import BaseModel

router = APIRouter(prefix="/api/chat", tags=["chatbot"])

class ChatRequest(BaseModel):
    message: str
    session_id: str = None

class ChatResponse(BaseModel):
    response: str
    session_id: str

@router.post("/message", response_model=ChatResponse)
async def chat_message(request: ChatRequest, db: Session = Depends(get_db)):
    """Simple chat endpoint (non-streaming)"""

    # Generate session ID if not provided
    session_id = request.session_id or str(uuid.uuid4())

    # Get conversation history from database
    history = db.query(ChatMessage).filter(
        ChatMessage.session_id == session_id
    ).order_by(ChatMessage.created_at).limit(10).all()

    # Convert to format AI expects
    conversation_history = []
    for msg in history:
        conversation_history.append({"role": "user", "content": msg.user_message})
        conversation_history.append({"role": "assistant", "content": msg.bot_response})

    # Get AI response
    ai_response = ai_chat_service.get_response(
        user_message=request.message,
        conversation_history=conversation_history
    )

    # Save to database
    chat_record = ChatMessage(
        user_message=request.message,
        bot_response=ai_response,
        session_id=session_id
    )
    db.add(chat_record)
    db.commit()

    return ChatResponse(response=ai_response, session_id=session_id)

@router.websocket("/ws/{session_id}")
async def websocket_chat(websocket: WebSocket, session_id: str, db: Session = Depends(get_db)):
    """WebSocket endpoint for real-time streaming chat"""
    await websocket.accept()

    try:
        while True:
            # Receive message from client
            data = await websocket.receive_text()
            user_message = json.loads(data)["message"]

            # Get conversation history
            history = db.query(ChatMessage).filter(
                ChatMessage.session_id == session_id
            ).order_by(ChatMessage.created_at).limit(10).all()

            conversation_history = []
            for msg in history:
                conversation_history.append({"role": "user", "content": msg.user_message})
                conversation_history.append({"role": "assistant", "content": msg.bot_response})

            # Stream AI response word by word
            full_response = ""
            for chunk in ai_chat_service.get_streaming_response(user_message, conversation_history):
                full_response += chunk
                await websocket.send_json({
                    "type": "stream",
                    "content": chunk
                })

            # Send completion signal
            await websocket.send_json({"type": "done"})

            # Save to database
            chat_record = ChatMessage(
                user_message=user_message,
                bot_response=full_response,
                session_id=session_id
            )
            db.add(chat_record)
            db.commit()
    
    except WebSocketDisconnect:
        print(f"Client {session_id} disconnected")