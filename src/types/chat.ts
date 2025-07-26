export interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  options?: string[];
  type?: 'text' | 'file' | 'voice' | 'video' | 'image' | 'link';
  attachments?: Attachment[];
  sentiment?: 'positive' | 'neutral' | 'negative';
  category?: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
}

export interface QuickOption {
  text: string;
  response: string;
  options?: string[];
  category?: string;
  icon?: string;
  color?: string;
}

export interface ChatSession {
  id: string;
  userId?: string;
  startTime: Date;
  endTime?: Date;
  messages: Message[];
  metadata: {
    userAgent: string;
    referrer: string;
    location?: string;
    language: string;
  };
}

export interface ChatAnalytics {
  totalSessions: number;
  activeUsers: number;
  averageSessionDuration: number;
  commonQueries: string[];
  satisfactionScore: number;
  conversionRate: number;
}

export interface ChatConfig {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  enableFileUploads: boolean;
  enableVoiceMessages: boolean;
  enableVideoChat: boolean;
  maxFileSize: number;
  allowedFileTypes: string[];
  businessHours: {
    enabled: boolean;
    timezone: string;
    hours: {
      [key: string]: { start: string; end: string; enabled: boolean };
    };
  };
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  services: Service[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  features: string[];
  technologies: string[];
  caseStudies?: CaseStudy[];
  pricing?: {
    startingPrice: number;
    currency: string;
    model: 'fixed' | 'hourly' | 'project';
  };
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  duration: string;
  teamSize: number;
}

export interface ChatUser {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  interests: string[];
  sessionHistory: ChatSession[];
  preferences: {
    notifications: boolean;
    newsletter: boolean;
    followUp: boolean;
  };
}