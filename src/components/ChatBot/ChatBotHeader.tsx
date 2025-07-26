import React from 'react';
import { MessageCircle, X, Minimize2, Maximize2 } from 'lucide-react';

interface ChatBotHeaderProps {
  isMinimized: boolean;
  onClose: () => void;
  onToggleMinimize: () => void;
}

const ChatBotHeader: React.FC<ChatBotHeaderProps> = ({
  isMinimized,
  onClose,
  onToggleMinimize
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 via-teal-600 to-purple-600 p-4 rounded-t-2xl text-white relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-4 -left-4 w-16 h-16 bg-white rounded-full animate-pulse"></div>
        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-full animate-pulse delay-75"></div>
        <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-white rounded-full animate-pulse delay-150"></div>
      </div>
      
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
            <MessageCircle size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-base">AspenCask AI Assistant</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
              <p className="text-xs text-blue-100">Online • Instant Response</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={onToggleMinimize}
            className="p-2 hover:bg-white/20 rounded-full transition-all duration-200 backdrop-blur-sm"
            title={isMinimized ? "Maximize" : "Minimize"}
          >
            {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-all duration-200 backdrop-blur-sm"
            title="Close Chat"
          >
            <X size={16} />
          </button>
        </div>
      </div>
      
      {/* Typing indicator for header */}
      {/* <div className="absolute bottom-1 right-4 text-xs text-blue-100 opacity-75">
        Response time: ~15 seconds
      </div> */}
    </div>
  );
};

export default ChatBotHeader;