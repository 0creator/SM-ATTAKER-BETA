import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

const ChatCopilot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'model',
      text: "I am the sm_attaker_beta Copilot. I can analyze current market regimes, explain active strategies, or provide forecasts. How can I assist?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(userMsg.text);
      
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-gray-850 p-4 border-b border-gray-800 flex justify-between items-center">
        <div className="flex items-center gap-2">
            <Sparkles className="text-indigo-400" size={18} />
            <h3 className="font-semibold text-gray-100">Cognitive Intelligence Layer</h3>
        </div>
        <div className="text-xs text-gray-500 font-mono">RAG: ACTIVE</div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-950/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-[90%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'model' ? 'bg-indigo-600' : 'bg-gray-700'
            }`}>
              {msg.role === 'model' ? <Bot size={16} className="text-white" /> : <User size={16} className="text-gray-300" />}
            </div>
            
            <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'model' 
                ? 'bg-gray-800 text-gray-200 rounded-tl-none border border-gray-700' 
                : 'bg-indigo-600 text-white rounded-tr-none'
            }`}>
              {msg.text}
              <div className={`text-[10px] mt-1 opacity-50 ${msg.role === 'user' ? 'text-right' : ''}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center shrink-0 animate-pulse">
                    <Bot size={16} className="text-white" />
                </div>
                <div className="bg-gray-800 p-3 rounded-2xl rounded-tl-none border border-gray-700 flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-gray-900 border-t border-gray-800">
        <div className="relative">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about strategy, drift, or forecasts..."
                className="w-full bg-gray-950 border border-gray-700 text-gray-100 rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-gray-600 transition-all"
            />
            <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-2 p-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <Send size={16} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default ChatCopilot;