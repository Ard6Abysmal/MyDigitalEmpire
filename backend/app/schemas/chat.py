from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ChatMessageBase(BaseModel):
    user_message: str
    session_id: str

class ChatMessageCreate(ChatMessageBase):
    bot_response: str

class ChatMessage(ChatMessageCreate):
    id: int
    is_useful: Optional[bool]
    created_at: datetime

    class Config:
        from_attributes = True