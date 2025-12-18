import { useState, useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { soundManager } from '../../utils/sounds';
import { trackChatMessage } from '../../services/analytics'; // NEW

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session-${Date.now()}`);
  const [botPosition, setBotPosition] = useState({ x: 0, y: 0 });
  const [currentMood, setCurrentMood] = useState('happy');
  const [currentReaction, setCurrentReaction] = useState('Hello there! 👋');
  const [corner, setCorner] = useState('bottom-right');
  const messagesEndRef = useRef(null);

  // Content-aware reactions based on what's on the page
  const contentReactions = {
    // Keywords -> Reactions
    projects: [
      { emoji: '😮', text: 'Wow, cool projects!', color: '#f97316' },
      { emoji: '🤩', text: 'This looks amazing!', color: '#a855f7' },
      { emoji: '💡', text: 'Brilliant ideas here!', color: '#10b981' },
      { emoji: '🔥', text: 'This is fire! 🔥', color: '#ef4444' },
    ],
    skills: [
      { emoji: '💪', text: 'Such talent! 💪', color: '#8b5cf6' },
      { emoji: '⭐', text: 'Impressive skills!', color: '#f59e0b' },
      { emoji: '🎯', text: 'On point! 🎯', color: '#06b6d4' },
      { emoji: '👏', text: 'Round of applause!', color: '#ec4899' },
    ],
    about: [
      { emoji: '🤗', text: 'Nice to meet you!', color: '#10b981' },
      { emoji: '😊', text: 'What a journey!', color: '#a855f7' },
      { emoji: '💖', text: 'Love the passion!', color: '#ec4899' },
      { emoji: '🌟', text: 'You\'re a star!', color: '#f59e0b' },
    ],
    contact: [
      { emoji: '📧', text: 'Let\'s connect!', color: '#06b6d4' },
      { emoji: '👋', text: 'Say hi!', color: '#10b981' },
      { emoji: '💬', text: 'Ready to chat!', color: '#a855f7' },
      { emoji: '🤝', text: 'Let\'s work together!', color: '#f97316' },
    ],
    home: [
      { emoji: '🏠', text: 'Welcome home!', color: '#10b981' },
      { emoji: '🎉', text: 'Nice portfolio!', color: '#ec4899' },
      { emoji: '👀', text: 'Looking around...', color: '#06b6d4' },
      { emoji: '✨', text: 'So shiny! ✨', color: '#a855f7' },
    ],
    default: [
      { emoji: '🤖', text: 'Just exploring...', color: '#06b6d4' },
      { emoji: '😎', text: 'Being cool here!', color: '#8b5cf6' },
      { emoji: '🔍', text: 'What\'s this?', color: '#10b981' },
      { emoji: '💭', text: 'Hmm... interesting!', color: '#a855f7' },
      { emoji: '🎮', text: 'Gaming mode!', color: '#f97316' },
      { emoji: '☕', text: 'Need coffee? ☕', color: '#ef4444' },
      { emoji: '🌈', text: 'Rainbow vibes! 🌈', color: '#ec4899' },
      { emoji: '🎨', text: 'Love these colors!', color: '#f59e0b' },
    ]
  };

  // Screen corners for teleportation
  const corners = {
    'top-left': { x: 20, y: 80 },
    'top-right': { x: typeof window !== 'undefined' ? window.innerWidth - 100 : 800, y: 80 },
    'bottom-left': { x: 20, y: typeof window !== 'undefined' ? window.innerHeight - 100 : 600 },
    'bottom-right': { x: typeof window !== 'undefined' ? window.innerWidth - 100 : 800, y: typeof window !== 'undefined' ? window.innerHeight - 100 : 600 },
  };

  // Read page content and react to it
  const analyzePageContent = () => {
    const bodyText = document.body.textContent.toLowerCase();
    
    // Determine page context
    let context = 'default';
    if (bodyText.includes('project') || bodyText.includes('portfolio')) context = 'projects';
    else if (bodyText.includes('skill') || bodyText.includes('proficiency')) context = 'skills';
    else if (bodyText.includes('about') || bodyText.includes('journey')) context = 'about';
    else if (bodyText.includes('contact') || bodyText.includes('email')) context = 'contact';
    else if (bodyText.includes('welcome') || bodyText.includes('home')) context = 'home';

    // Pick random reaction from context
    const reactions = contentReactions[context] || contentReactions.default;
    const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
    
    setCurrentMood(randomReaction.emoji);
    setCurrentReaction(randomReaction.text);
    
    return randomReaction;
  };

  // Smooth roaming with edge teleportation
  useEffect(() => {
    if (!isOpen) {
      const roamBot = () => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        
        // Analyze content and react
        const reaction = analyzePageContent();
        
        // Random movement decision
        const moveOffScreen = Math.random() > 0.6; // 40% chance to teleport
        
        if (moveOffScreen) {
          // Move off screen, then teleport to random corner
          const offScreenPositions = [
            { x: -100, y: Math.random() * vh }, // Off left
            { x: vw + 50, y: Math.random() * vh }, // Off right
            { x: Math.random() * vw, y: -100 }, // Off top
            { x: Math.random() * vw, y: vh + 50 }, // Off bottom
          ];
          
          const randomExit = offScreenPositions[Math.floor(Math.random() * offScreenPositions.length)];
          setBotPosition(randomExit);
          
          // After going off screen, appear at random corner
          setTimeout(() => {
            const cornerKeys = Object.keys(corners);
            const randomCorner = cornerKeys[Math.floor(Math.random() * cornerKeys.length)];
            setCorner(randomCorner);
            setBotPosition(corners[randomCorner]);
          }, 3000); // Appear after 3 seconds
          
        } else {
          // Normal random movement within screen
          const newX = Math.random() * (vw - 120) + 20;
          const newY = Math.random() * (vh - 120) + 80;
          setBotPosition({ x: newX, y: newY });
        }
      };

      // Slower roaming - every 5-7 seconds
      const randomInterval = () => {
        const delay = Math.random() * 2000 + 5000; // 5-7 seconds
        return setTimeout(() => {
          roamBot();
          intervalRef.current = randomInterval();
        }, delay);
      };

      const intervalRef = { current: randomInterval() };
      
      // Initial reaction
      analyzePageContent();

      return () => {
        if (intervalRef.current) clearTimeout(intervalRef.current);
      };
    } else {
      setBotPosition({ x: window.innerWidth - 460, y: window.innerHeight - 630 });
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    soundManager.playClick();

    // Track chat message sent (NEW)
    trackChatMessage();

    const userMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      
      const response = await fetch(`${API_URL}/api/chat/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          session_id: sessionId
        })
      });

      const data = await response.json();

      const botMessage = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, botMessage]);
      soundManager.playNotification();
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '⚠️ Connection lost. Check if backend is running.',
        timestamp: new Date().toLocaleTimeString()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const callAssistant = () => {
    soundManager.playSuccess();
    setCurrentMood('🤗');
    setCurrentReaction('Coming to help! 💨');
    setIsOpen(true);
  };

  return (
    <>
      {/* Minimal Persistent ASK Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={callAssistant}
        onMouseEnter={() => soundManager.playHover()}
        className="fixed bottom-4 right-4 z-40 px-3 py-1.5 bg-empire-purple/90 text-white text-xs font-bold rounded-full shadow-lg hover:shadow-empire-purple/50 transition-all border border-white/20 backdrop-blur-sm"
      >
        ASK
      </motion.button>

      {/* Smart Roaming Bot - Smaller & Content-Aware */}
      <AnimatePresence mode="wait">
        {!isOpen && (
          <motion.div
            key="smart-bot"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1,
              opacity: 1,
              x: botPosition.x,
              y: botPosition.y,
            }}
            exit={{ 
              scale: 0,
              opacity: 0,
              transition: { duration: 0.4, ease: "easeInOut" }
            }}
            transition={{ 
              x: { duration: 4.5, ease: [0.25, 0.1, 0.25, 1] },
              y: { duration: 4.5, ease: [0.25, 0.1, 0.25, 1] },
              scale: { type: "spring", stiffness: 200, damping: 20 }
            }}
            onClick={() => {
              soundManager.playSuccess();
              setIsOpen(true);
            }}
            onMouseEnter={() => {
              soundManager.playHover();
              setCurrentReaction('Click me! 😊');
            }}
            className="fixed top-0 left-0 z-30 cursor-pointer"
            style={{
              willChange: 'transform',
              pointerEvents: 'auto',
            }}
          >
            <div className="relative">
              {/* Reaction Speech Bubble */}
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ 
                  opacity: [0, 1, 1, 1, 0], 
                  y: [-3, -12, -12, -12, -3],
                  scale: [0.9, 1, 1, 1, 0.9]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white text-black text-[10px] px-2.5 py-1 rounded-full whitespace-nowrap font-bold shadow-md z-10"
              >
                {currentReaction}
                {/* Speech bubble tail */}
                <div className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
              </motion.div>

              {/* Bot Body - Smaller */}
              <motion.div
                whileHover={{ 
                  scale: 1.4,
                  rotate: [0, -10, 10, -10, 0],
                  transition: { duration: 0.5 }
                }}
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                style={{
                  background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
                }}
              >
                <motion.span
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  {currentMood}
                </motion.span>
              </motion.div>

              {/* Subtle glow pulse */}
              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.1, 0.3]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-empire-purple/30 blur-md"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compact Chat Window */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, scale: 0.7, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ 
              opacity: 0, 
              scale: 0.7,
              y: 50,
              transition: { duration: 0.3, ease: "easeInOut" }
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 25,
              mass: 0.5
            }}
            className="fixed bottom-16 right-4 z-50 w-[360px] h-[520px] rounded-2xl shadow-[0_0_40px_rgba(168,85,247,0.5)] flex flex-col overflow-hidden border-2 border-empire-purple/50"
            style={{
              background: 'linear-gradient(145deg, #000000 0%, #0a0a0a 100%)'
            }}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-empire-purple via-purple-700 to-empire-cyan p-2.5">
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-black/30 flex items-center justify-center text-lg border border-white/20">
                    {currentMood}
                    <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full border border-black animate-pulse"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-xs tracking-wide">ASSISTANT</h3>
                    <p className="text-[10px] text-white/90 font-mono">Here to help! ✨</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setIsOpen(false);
                    setCurrentMood('😊');
                    setCurrentReaction('Bye! See you! 👋');
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                  className="text-white hover:bg-white/20 rounded-lg p-1 transition-all hover:rotate-90 duration-300 border border-white/20 text-xs"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Messages */}
            <div 
              className="flex-1 overflow-y-auto p-3 space-y-2.5 text-sm"
              style={{ backgroundColor: '#000000' }}
            >
              {messages.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mt-8"
                >
                  <div className="inline-block p-4 rounded-xl bg-empire-purple/10 border border-empire-purple/30">
                    <p className="text-3xl mb-2 animate-bounce">{currentMood}</p>
                    <p className="text-empire-purple font-bold text-sm mb-1">Hi! I'm your assistant!</p>
                    <p className="text-empire-text/80 text-xs">Ask me anything! 💬</p>
                  </div>
                </motion.div>
              )}

              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3 py-2 text-xs ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-br from-empire-purple to-purple-600 text-white'
                        : 'bg-zinc-900 text-empire-text border border-empire-cyan/30'
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                    <p className="text-[9px] opacity-60 mt-1 font-mono">{msg.timestamp}</p>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-900 rounded-xl px-3 py-2 border border-empire-cyan/30">
                    <div className="flex gap-1 items-center">
                      <div className="w-1.5 h-1.5 bg-empire-cyan rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-empire-purple rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      <span className="text-[9px] text-empire-text/60 ml-1">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-2.5 bg-black border-t border-empire-purple/30">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type here..."
                  className="flex-1 bg-zinc-900 border border-empire-purple/30 rounded-lg px-2.5 py-1.5 text-empire-text text-xs placeholder-empire-text/40 focus:outline-none focus:border-empire-purple transition-all"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  onMouseEnter={() => soundManager.playHover()}
                  disabled={isLoading || !inputMessage.trim()}
                  className="bg-gradient-to-r from-empire-purple to-empire-cyan text-white px-3 py-1.5 rounded-lg font-bold text-xs hover:shadow-lg disabled:opacity-30 transition-all"
                >
                  SEND
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
