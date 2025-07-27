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
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 rounded text-sm">$1</code>')
      .replace(/\n/g, '<br />');
  };

  const isBot = message.isBot;
  const messageTime = message.timestamp.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className={`flex flex-col ${isBot ? 'items-start' : 'items-end'} gap-1 mb-6`}>
      <div className="flex w-full max-w-3xl">
        {isBot && (
          <div className="mr-3 mt-1">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md">
              AC
            </div>
          </div>
        )}

        <div className={`flex-1 ${isBot ? 'order-2' : 'order-1'}`}>
          <div
            className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-md transition-all duration-300 ${
              isBot
                ? 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 rounded-bl-sm border border-gray-200'
                : 'bg-gradient-to-br from-blue-600 to-teal-600 text-white rounded-br-sm'
            }`}
          >
            <div
              className="whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: formatText(message.text) }}
            />

            {/* Actions */}
            {isBot && (
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-200">
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="p-1 rounded hover:bg-gray-200 transition"
                    title="Copy"
                  >
                    <Copy size={14} className="text-gray-500" />
                  </button>
                  <button
                    onClick={() => handleReaction('like')}
                    className={`p-1 rounded transition ${
                      reaction === 'like'
                        ? 'bg-green-100 text-green-600'
                        : 'text-gray-500 hover:bg-gray-200'
                    }`}
                    title="Helpful"
                  >
                    <ThumbsUp size={14} />
                  </button>
                  <button
                    onClick={() => handleReaction('dislike')}
                    className={`p-1 rounded transition ${
                      reaction === 'dislike'
                        ? 'bg-red-100 text-red-600'
                        : 'text-gray-500 hover:bg-gray-200'
                    }`}
                    title="Not helpful"
                  >
                    <ThumbsDown size={14} />
                  </button>
                </div>
                <span className="text-xs text-gray-400">{messageTime}</span>
              </div>
            )}
          </div>

          {/* Option Buttons */}
          {message.options && message.options.length > 0 && (
            <div className="mt-4 space-y-2">
              {message.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => onOptionClick(option)}
                  className="w-full px-4 py-3 text-left text-sm bg-white border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-400 transition-all shadow-sm hover:shadow-md flex items-center justify-between"
                >
                  <span className="font-medium text-gray-700">{option}</span>
                  <ExternalLink size={14} className="text-gray-400 group-hover:text-blue-500" />
                </button>
              ))}
            </div>
          )}

          {/* Copy Confirmation */}
          {copied && (
            <div className="mt-2 text-xs text-green-600 bg-green-50 px-2 py-1 rounded shadow-sm">
              ✓ Copied to clipboard
            </div>
          )}
        </div>

        {/* Timestamp for user messages */}
        {!isBot && (
          <div className="ml-3 mt-auto text-xs text-gray-400">{messageTime}</div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
