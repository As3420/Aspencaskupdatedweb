import { Message, ChatSession } from '../types/chat';

export const formatMessageText = (text: string): string => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 rounded text-sm">$1</code>')
    .replace(/\n/g, '<br />');
};

export const sanitizeInput = (input: string): string => {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .trim();
};

export const extractKeywords = (text: string): string[] => {
  const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should'];
  
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.includes(word))
    .filter((word, index, array) => array.indexOf(word) === index)
    .slice(0, 10);
};

export const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const calculateSessionDuration = (startTime: Date, endTime?: Date): number => {
  const end = endTime || new Date();
  return Math.round((end.getTime() - startTime.getTime()) / 1000);
};

export const exportChatSession = (session: ChatSession): void => {
  const dataStr = JSON.stringify(session, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportFileDefaultName = `aspencask_chat_${session.id}_${new Date().toISOString().split('T')[0]}.json`;
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
};

export const loadChatHistory = (): Message[] => {
  try {
    const saved = localStorage.getItem('aspencask_chat_history');
    if (saved) {
      const messages = JSON.parse(saved);
      return messages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
    }
  } catch (error) {
    console.error('Failed to load chat history:', error);
  }
  return [];
};

export const saveChatHistory = (messages: Message[]): void => {
  try {
    const messagesToSave = messages.slice(-50); // Keep only last 50 messages
    localStorage.setItem('aspencask_chat_history', JSON.stringify(messagesToSave));
  } catch (error) {
    console.error('Failed to save chat history:', error);
  }
};

export const clearChatHistory = (): void => {
  try {
    localStorage.removeItem('aspencask_chat_history');
    localStorage.removeItem('aspencask_chat_analytics');
  } catch (error) {
    console.error('Failed to clear chat history:', error);
  }
};

export const detectIntent = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  const intents = {
    'pricing': ['price', 'cost', 'budget', 'expensive', 'cheap', 'quote', 'estimate'],
    'contact': ['contact', 'phone', 'email', 'call', 'reach', 'talk', 'speak'],
    'services': ['service', 'do', 'offer', 'provide', 'help', 'solution'],
    'about': ['about', 'company', 'team', 'history', 'founded', 'who'],
    'technical': ['how', 'what', 'technology', 'stack', 'framework', 'language'],
    'timeline': ['when', 'time', 'duration', 'long', 'fast', 'quick'],
    'support': ['support', 'help', 'assistance', 'problem', 'issue', 'bug']
  };
  
  for (const [intent, keywords] of Object.entries(intents)) {
    if (keywords.some(keyword => lowerMessage.includes(keyword))) {
      return intent;
    }
  }
  
  return 'general';
};

export const generateSmartSuggestions = (message: string): string[] => {
  const intent = detectIntent(message);
  
  const suggestionMap: { [key: string]: string[] } = {
    'pricing': ['💰 Get Quote', '📊 View Pricing Plans', '💼 Request Proposal'],
    'contact': ['📞 Call Now', '📧 Send Email', '📅 Schedule Meeting'],
    'services': ['🌟 Our Services', '📊 Case Studies', '🔄 Service Comparison'],
    'about': ['🏢 About Us', '👥 Meet Our Team', '🏆 Our Achievements'],
    'technical': ['💻 Technologies', '🔧 Development Process', '📚 Documentation'],
    'timeline': ['⏱️ Project Timeline', '🚀 Quick Start', '📋 Planning Process'],
    'support': ['🛠️ Support Options', '📞 Emergency Contact', '💬 Live Chat'],
    'general': ['🌟 Our Services', '📞 Contact Us', '💰 Get Quote', '🏢 About Us']
  };
  
  return suggestionMap[intent] || suggestionMap['general'];
};

export const validateFileUpload = (file: File): { valid: boolean; error?: string } => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'image/jpeg',
    'image/png',
    'image/gif'
  ];
  
  if (file.size > maxSize) {
    return { valid: false, error: 'File size must be less than 10MB' };
  }
  
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'File type not supported. Please upload PDF, DOC, DOCX, TXT, or image files.' };
  }
  
  return { valid: true };
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};