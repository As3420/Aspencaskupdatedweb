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
    <div className="bg-gradient-to-r from-blue-600 via-teal-600 to-purple-600 p-2 sm:p-4 rounded-t-2xl text-white relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-4 -left-4 w-8 h-8 sm:w-16 sm:h-16 bg-white rounded-full animate-pulse"></div>
        <div className="absolute -bottom-2 -right-2 w-6 h-6 sm:w-12 sm:h-12 bg-white rounded-full animate-pulse delay-75"></div>
        <div className="absolute top-1/2 left-1/2 w-4 h-4 sm:w-8 sm:h-8 bg-white rounded-full animate-pulse delay-150"></div>
      </div>
      
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 flex-shrink-0">
            <MessageCircle size={16} className="text-white sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-sm sm:text-base truncate">
              <span className="hidden sm:inline">AspenCask AI Assistant</span>
              <span className="sm:hidden">AspenCask AI Assistant</span>
            </h3>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-ping flex-shrink-0"></div>
              <p className="text-xs text-blue-100 truncate">
                <span className="hidden sm:inline">Online • Instant Response</span>
                <span className="sm:hidden">Online</span>
              </p>
            </div>
          </div>
        </div>
        
        {/* <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0 ml-2">
          <button
            onClick={onToggleMinimize}
            className="p-1.5 sm:p-2 hover:bg-white/20 rounded-full transition-all duration-200 backdrop-blur-sm"
            title={isMinimized ? "Maximize" : "Minimize"}
          >
            {isMinimized ? (
              <Maximize2 size={14} className="sm:w-4 sm:h-4" />
            ) : (
              <Minimize2 size={14} className="sm:w-4 sm:h-4" />
            )}
          </button>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 hover:bg-white/20 rounded-full transition-all duration-200 backdrop-blur-sm"
            title="Close Chat"
          >
            <X size={14} className="sm:w-4 sm:h-4" />
          </button>
        </div> */}
      </div>
      
      {/* Optional: Typing indicator for larger screens only */}
      {/* <div className="absolute bottom-1 right-4 text-xs text-blue-100 opacity-75 hidden sm:block">
        Response time: ~15 seconds
      </div> */}
    </div>
  );
};

export default ChatBotHeader;
