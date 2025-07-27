import React from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  inputValue: string;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  isTyping: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  inputValue,
  onInputChange,
  onSendMessage,
  isTyping,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  // Adjust textarea height dynamically
  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = 'auto';
    target.style.height = Math.min(target.scrollHeight, 128) + 'px'; // Max height 128px (approx 4 rows)
    onInputChange(target.value);
  };

  // Determine if the send button should be disabled
  const isSendDisabled = !inputValue.trim() || isTyping;

  return (
    <div className="p-4 bg-white border-t border-gray-200 shadow-lg rounded-b-2xl">
      <div className="flex items-end gap-3">
        {/* Input field container */}
        <div className="flex-1 relative">
          <textarea
            value={inputValue}
            onChange={() => {}} // onChange is handled by onInput for dynamic height
            onInput={handleInput}
            onKeyPress={handleKeyPress}
            placeholder={isTyping ? "Bot is typing..." : "Type your message..."}
            className={`
              w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              text-base text-gray-800 placeholder-gray-500
              resize-none min-h-[48px] max-h-32 transition-all duration-200 ease-in-out
              shadow-sm
              ${isTyping ? 'opacity-70 cursor-not-allowed' : ''}
            `}
            disabled={isTyping}
            rows={1}
            style={{
              height: 'auto',
              minHeight: '48px', // Slightly increased min-height for better feel
            }}
          />

          {/* Character counter (with character limit applied) */}
          {inputValue.length > 0 && (
            <div className={`absolute -bottom-5 right-0 text-xs font-medium ${inputValue.length > 500 ? 'text-red-500' : 'text-gray-500'}`}>
              {inputValue.length}/500
            </div>
          )}
        </div>

        {/* Send button */}
        <button
          onClick={onSendMessage}
          disabled={isSendDisabled}
          className={`
            flex items-center justify-center gap-2 px-5 py-3
            bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl
            hover:from-blue-700 hover:to-purple-700
            disabled:opacity-40 disabled:cursor-not-allowed
            transition-all duration-300 ease-in-out
            shadow-lg hover:shadow-xl transform hover:-translate-y-0.5
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            min-w-[50px] sm:min-w-fit
          `}
          title="Send message"
        >
          <Send size={18} />
          <span className="hidden sm:inline text-base font-semibold">Send</span>
        </button>
      </div>
    </div>
  );
};

export default ChatInput;