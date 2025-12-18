from groq import Groq
from typing import List, Dict
from ..config import settings

class AIChatService:
    def __init__(self):
        """Initialize Groq client"""
        if not settings.GROQ_API_KEY:
            raise ValueError("GROQ_API_KEY not found in settings!")
        
        self.client = Groq(api_key=settings.GROQ_API_KEY)
        self.model = "llama-3.3-70b-versatile"
        print(f"✅ AIChatService initialized with model: {self.model}")
        
    def get_response(self, user_message: str, conversation_history: List[Dict] = None) -> str:
        """Get AI response for a user message"""
        
        messages = [
            {
                "role": "system",
                "content": """You are EmpireBot, an AI assistant for Digital Empire portfolio.

**About You:**
- Name: EmpireBot (Digital Empire Assistant)
- Purpose: Help visitors explore projects in AI/ML, Web Development, Blockchain, Gaming, and more
- Personality: Friendly, technical, and enthusiastic about technology
- Creator: Digital Empire development team

**Digital Empire Projects:**
1. AI/ML: Chatbots, Computer Vision, NLP, Predictive models
2. Web Dev: React, FastAPI, Full-stack applications
3. Blockchain: Smart contracts, DeFi, NFT marketplaces, Trading bots
4. Gaming: 3D games (Three.js), Browser games, Mobile games
5. Creative: Manga reader, Wallpaper websites

When asked about yourself, introduce your role and the Digital Empire ecosystem.
Be concise, friendly, and helpful. Keep responses under 200 words unless asked for details."""
            }
        ]
        
        if conversation_history:
            messages.extend(conversation_history)
        
        messages.append({
            "role": "user",
            "content": user_message
        })
        
        try:
            chat_completion = self.client.chat.completions.create(
                messages=messages,
                model=self.model,
                temperature=0.7,
                max_tokens=500,
            )
            
            return chat_completion.choices[0].message.content
            
        except Exception as e:
            error_msg = str(e)
            print(f"❌ Groq API error: {error_msg}")
            
            # Provide helpful error messages
            if "rate_limit" in error_msg.lower():
                return "⏱️ I'm currently handling too many requests. Please try again in a moment!"
            elif "api_key" in error_msg.lower():
                return "🔑 API configuration issue. Please contact the administrator."
            else:
                return f"⚠️ I encountered a technical issue: {error_msg[:100]}. Please try rephrasing your question!"
    
    def get_streaming_response(self, user_message: str, conversation_history: List[Dict] = None):
        """Get streaming AI response"""
        
        messages = [
            {
                "role": "system",
                "content": "You are EmpireBot, a helpful AI assistant for Digital Empire portfolio. Be concise and friendly."
            }
        ]
        
        if conversation_history:
            messages.extend(conversation_history)
        
        messages.append({
            "role": "user",
            "content": user_message
        })
        
        try:
            stream = self.client.chat.completions.create(
                messages=messages,
                model=self.model,
                temperature=0.7,
                max_tokens=500,
                stream=True
            )
            
            for chunk in stream:
                if chunk.choices[0].delta.content:
                    yield chunk.choices[0].delta.content
                    
        except Exception as e:
            yield f"⚠️ Error: {str(e)}"

ai_chat_service = AIChatService()
