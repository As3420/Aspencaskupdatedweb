import React, { useState } from 'react';
import { Copy, ThumbsUp, ThumbsDown, ExternalLink } from 'lucide-react';
import { Message } from '../../types/chat';

interface ChatMessageProps {
  message: Message;
  onOptionClick: (option: string) => void;
  onReaction?: (messageId: string, reaction: 'like' | 'dislike') => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  onOptionClick,
  onReaction 
}) => {
  const [copied, setCopied] = useState(false);
  const [reaction, setReaction] = useState<'like' | 'dislike' | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleReaction = (type: 'like' | 'dislike') => {
    setReaction(type);
    onReaction?.(message.id, type);
  };

  const formatText = (text: string) => {
    // Convert markdown-style formatting
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 rounded">$1</code>')
      .replace(/\n/g, '<br />');
  };

  const isBot = message.isBot;
  const messageTime = message.timestamp.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} group`}>
      <div className={`max-w-[85%] ${isBot ? 'order-2' : 'order-1'}`}>
        {/* Message bubble */}
        <div
          className={`p-4 rounded-2xl text-sm shadow-sm transition-all duration-200 ${
            isBot
              ? 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 rounded-bl-sm border border-gray-200'
              : 'bg-gradient-to-br from-blue-600 to-teal-600 text-white rounded-br-sm shadow-md'
          }`}
        >
          {/* Message text with formatting */}
          <div 
            className="whitespace-pre-line leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formatText(message.text) }}
          />

          {/* Message actions for bot messages */}
          {isBot && (
            <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopy}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                  title="Copy message"
                >
                  <Copy size={12} className="text-gray-500" />
                </button>
                <button
                  onClick={() => handleReaction('like')}
                  className={`p-1 hover:bg-gray-200 rounded transition-colors ${
                    reaction === 'like' ? 'bg-green-100 text-green-600' : 'text-gray-500'
                  }`}
                  title="Helpful"
                >
                  <ThumbsUp size={12} />
                </button>
                <button
                  onClick={() => handleReaction('dislike')}
                  className={`p-1 hover:bg-gray-200 rounded transition-colors ${
                    reaction === 'dislike' ? 'bg-red-100 text-red-600' : 'text-gray-500'
                  }`}
                  title="Not helpful"
                >
                  <ThumbsDown size={12} />
                </button>
              </div>
              <span className="text-xs text-gray-400">{messageTime}</span>
            </div>
          )}
        </div>

        {/* Quick options */}
        {message.options && message.options.length > 0 && (
          <div className="mt-3 space-y-2">
            {message.options.map((option, index) => (
              <button
                key={index}
                onClick={() => onOptionClick(option)}
                className="block w-full text-left px-4 py-3 text-sm bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200 shadow-sm hover:shadow-md group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{option}</span>
                  <ExternalLink size={12} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Copy confirmation */}
        {copied && (
          <div className="mt-2 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
            ✓ Copied to clipboard
          </div>
        )}
      </div>

      {/* Avatar for bot messages */}
      {isBot && (
        <div className="order-1 mr-3 mt-1">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
            AC
          </div>
        </div>
      )}

      {/* Timestamp for user messages */}
      {!isBot && (
        <div className="order-2 ml-3 mt-auto">
          <span className="text-xs text-gray-400">{messageTime}</span>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;