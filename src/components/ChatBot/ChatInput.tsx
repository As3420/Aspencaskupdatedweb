import React, { useState, useRef } from 'react';
import { Send, Paperclip, Mic, MicOff, Smile } from 'lucide-react';

interface ChatInputProps {
  inputValue: string;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  isTyping: boolean;
  onFileUpload?: (file: File) => void;
  onVoiceRecord?: (audioBlob: Blob) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  inputValue,
  onInputChange,
  onSendMessage,
  isTyping,
  onFileUpload,
  onVoiceRecord
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const emojis = ['😊', '👍', '❤️', '😂', '🤔', '👋', '🔥', '💯', '🚀', '⭐'];

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onFileUpload) {
      onFileUpload(file);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks: Blob[] = [];
      
      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: 'audio/wav' });
        if (onVoiceRecord) {
          onVoiceRecord(audioBlob);
        }
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const insertEmoji = (emoji: string) => {
    onInputChange(inputValue + emoji);
    setShowEmojis(false);
  };

  return (
    <div className="p-4 border-t border-gray-100 bg-white rounded-b-2xl">
      {/* Emoji picker */}
      {showEmojis && (
        <div className="mb-3 p-2 bg-gray-50 rounded-lg">
          <div className="flex flex-wrap gap-2">
            {emojis.map((emoji, index) => (
              <button
                key={index}
                onClick={() => insertEmoji(emoji)}
                className="text-lg hover:bg-gray-200 rounded p-1 transition-colors"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="flex items-end space-x-2">
        {/* File upload */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
          title="Attach file"
        >
          <Paperclip size={18} />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileUpload}
          className="hidden"
          accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
        />

        {/* Emoji button */}
        <button
          onClick={() => setShowEmojis(!showEmojis)}
          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
          title="Add emoji"
        >
          <Smile size={18} />
        </button>

        {/* Input field */}
        <div className="flex-1 relative">
          <textarea
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message... (Press Enter to send)"
            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none min-h-[44px] max-h-32 transition-all"
            disabled={isTyping}
            rows={1}
            style={{ 
              height: 'auto',
              minHeight: '44px'
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = Math.min(target.scrollHeight, 128) + 'px';
            }}
          />
          
          {/* Character counter */}
          {inputValue.length > 200 && (
            <div className="absolute -bottom-6 right-0 text-xs text-gray-400">
              {inputValue.length}/500
            </div>
          )}
        </div>

        {/* Voice recording */}
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`p-2 rounded-full transition-all ${
            isRecording 
              ? 'text-red-600 bg-red-50 animate-pulse' 
              : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
          }`}
          title={isRecording ? "Stop recording" : "Voice message"}
        >
          {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
        </button>

        {/* Send button */}
        <button
          onClick={onSendMessage}
          disabled={!inputValue.trim() || isTyping}
          className="px-4 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-2xl hover:from-blue-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg flex items-center space-x-2"
        >
          <Send size={16} />
          <span className="hidden sm:inline text-sm font-medium">Send</span>
        </button>
      </div>

      {/* Recording indicator */}
      {isRecording && (
        <div className="mt-2 flex items-center space-x-2 text-red-600 text-sm">
          <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
          <span>Recording... Click to stop</span>
        </div>
      )}
    </div>
  );
};

export default ChatInput;