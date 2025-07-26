import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Download, BarChart3 } from 'lucide-react';
import ChatBotHeader from './ChatBotHeader';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import ChatFooter from './ChatFooter';
import { useChat } from '../../hooks/useChat';
import { useChatAnalytics } from '../../hooks/useChatAnalytics';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const {
    messages,
    inputValue,
    setInputValue,
    isTyping,
    messageCount,
    handleQuickOption,
    handleSendMessage,
    handleFileUpload,
    handleVoiceRecord,
    exportChatHistory
  } = useChat();

  const { analytics, trackSession, trackQuery, trackSatisfaction } = useChatAnalytics();

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Track session when chat opens
  useEffect(() => {
    if (isOpen) {
      trackSession();
    }
  }, [isOpen, trackSession]);

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const handleToggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleOptionClick = (option: string) => {
    trackQuery(option);
    handleQuickOption(option);
  };

  const handleMessageReaction = (messageId: string, reaction: 'like' | 'dislike') => {
    trackSatisfaction(reaction === 'like' ? 5 : 1);
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      trackQuery(inputValue);
    }
    handleSendMessage();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Widget */}
      {isOpen && (
        <div className={`mb-4 bg-white rounded-2xl shadow-2xl border border-gray-200 transition-all duration-300 ${
          isMinimized ? 'w-80 h-16' : 'w-80 sm:w-96 max-h-[36rem]'
        } flex flex-col animate-in slide-in-from-bottom-4`}>
          
          {/* Header */}
          <ChatBotHeader 
            isMinimized={isMinimized}
            onClose={handleClose}
            onToggleMinimize={handleToggleMinimize}
          />

          {/* Chat Content - Hidden when minimized */}
          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto max-h-80 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    onOptionClick={handleOptionClick}
                    onReaction={handleMessageReaction}
                  />
                ))}
                
                {/* Typing Indicator */}
                {isTyping && <TypingIndicator />}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Statistics */}
              <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 text-xs text-gray-500">
                <div className="flex items-center justify-between">
                  <span>Messages: {messageCount}</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setShowAnalytics(!showAnalytics)}
                      className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
                      title="View Analytics"
                    >
                      <BarChart3 size={12} />
                      <span>Analytics</span>
                    </button>
                    <button
                      onClick={exportChatHistory}
                      className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
                      title="Export Chat"
                    >
                      <Download size={12} />
                      <span>Export</span>
                    </button>
                  </div>
                </div>
                
                {/* Analytics Panel */}
                {showAnalytics && (
                  <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200 text-xs">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="font-medium">Sessions:</span> {analytics.totalSessions}
                      </div>
                      <div>
                        <span className="font-medium">Satisfaction:</span> {analytics.satisfactionScore.toFixed(1)}/5
                      </div>
                      <div className="col-span-2">
                        <span className="font-medium">Top Queries:</span>
                        <div className="text-gray-400 text-xs mt-1">
                          {analytics.commonQueries.slice(-3).join(', ') || 'No data yet'}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <ChatInput
                inputValue={inputValue}
                onInputChange={setInputValue}
                onSendMessage={handleSend}
                isTyping={isTyping}
                onFileUpload={handleFileUpload}
                onVoiceRecord={handleVoiceRecord}
              />

              {/* Footer */}
              <ChatFooter />
            </>
          )}
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={isOpen ? handleClose : handleOpen}
        className="relative w-16 h-16 bg-gradient-to-br from-blue-600 via-teal-600 to-purple-600 hover:from-blue-700 hover:via-teal-700 hover:to-purple-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group overflow-hidden"
      >
        {/* Background animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-teal-600 to-purple-600 animate-pulse opacity-75"></div>
        
        {/* Icon */}
        <div className="relative z-10">
          {isOpen ? (
            <X size={24} className="transition-transform group-hover:scale-110" />
          ) : (
            <MessageCircle size={24} className="transition-transform group-hover:scale-110" />
          )}
        </div>
        
        {/* Notification Badge */}
        {!isOpen && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-bounce shadow-lg">
            AI
          </div>
        )}

        {/* Pulse rings */}
        {!isOpen && (
          <>
            <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping opacity-75"></div>
            <div className="absolute inset-0 rounded-full border-2 border-teal-400 animate-ping opacity-50" style={{ animationDelay: '0.5s' }}></div>
          </>
        )}
      </button>

      {/* Floating tooltip */}
      {!isOpen && (
        <div className="absolute bottom-20 right-0 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg">
          💬 Chat with AspenCask AI
          <div className="absolute top-full right-4 w-2 h-2 bg-gray-900 transform rotate-45"></div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;