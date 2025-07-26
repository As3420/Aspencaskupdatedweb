import { ChatConfig } from '../types/chat';

export const defaultChatConfig: ChatConfig = {
  theme: 'light',
  language: 'en',
  position: 'bottom-right',
  enableFileUploads: true,
  enableVoiceMessages: true,
  enableVideoChat: false,
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedFileTypes: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'image/jpeg',
    'image/png',
    'image/gif'
  ],
  businessHours: {
    enabled: true,
    timezone: 'Asia/Kolkata',
    hours: {
      monday: { start: '09:00', end: '20:00', enabled: true },
      tuesday: { start: '09:00', end: '20:00', enabled: true },
      wednesday: { start: '09:00', end: '20:00', enabled: true },
      thursday: { start: '09:00', end: '20:00', enabled: true },
      friday: { start: '09:00', end: '20:00', enabled: true },
      saturday: { start: '10:00', end: '18:00', enabled: true },
      sunday: { start: '10:00', end: '16:00', enabled: false }
    }
  }
};

export const chatThemes = {
  light: {
    primary: 'from-blue-600 to-teal-600',
    secondary: 'from-gray-50 to-gray-100',
    accent: 'from-purple-600 to-pink-600',
    text: 'text-gray-800',
    background: 'bg-white'
  },
  dark: {
    primary: 'from-blue-500 to-teal-500',
    secondary: 'from-gray-800 to-gray-900',
    accent: 'from-purple-500 to-pink-500',
    text: 'text-gray-100',
    background: 'bg-gray-900'
  }
};

export const supportedLanguages = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  pt: 'Português',
  ru: 'Русский',
  zh: '中文',
  ja: '日本語',
  ko: '한국어',
  hi: 'हिन्दी',
  ar: 'العربية'
};

export const businessHoursCheck = (config: ChatConfig): boolean => {
  if (!config.businessHours.enabled) return true;
  
  const now = new Date();
  const dayName = now.toLocaleLowerCase('en-US', { weekday: 'long' }) as keyof typeof config.businessHours.hours;
  const dayConfig = config.businessHours.hours[dayName];
  
  if (!dayConfig.enabled) return false;
  
  const currentTime = now.toLocaleTimeString('en-US', { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit',
    timeZone: config.businessHours.timezone
  });
  
  return currentTime >= dayConfig.start && currentTime <= dayConfig.end;
};

export const getBusinessHoursMessage = (config: ChatConfig): string => {
  const isOpen = businessHoursCheck(config);
  
  if (isOpen) {
    return "We're currently online! Expect immediate responses.";
  }
  
  const nextOpenDay = getNextBusinessDay(config);
  return `We're currently offline. We'll be back ${nextOpenDay}. Leave a message and we'll respond within 2 hours of reopening!`;
};

const getNextBusinessDay = (config: ChatConfig): string => {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const now = new Date();
  
  for (let i = 1; i <= 7; i++) {
    const nextDay = new Date(now);
    nextDay.setDate(now.getDate() + i);
    const dayName = days[nextDay.getDay()] as keyof typeof config.businessHours.hours;
    const dayConfig = config.businessHours.hours[dayName];
    
    if (dayConfig.enabled) {
      const dayDisplayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);
      return `${dayDisplayName} at ${dayConfig.start}`;
    }
  }
  
  return 'soon';
};