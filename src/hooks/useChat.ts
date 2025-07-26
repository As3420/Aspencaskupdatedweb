import { useState, useEffect, useCallback } from 'react';
import { Message } from '../types/chat';
import { quickOptions, serviceResponses, getResponseByKeyword } from '../data/chatResponses';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}`);
  const [messageCount, setMessageCount] = useState(0);

  // Initialize chat with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome_1',
        text: `🌟 Welcome to AspenCask Solution LLP! 

I'm your AI assistant, ready to help you discover how our cutting-edge technology solutions can transform your business.

What we excel at:
🌐 Web Development - Custom websites & web applications
📱 Mobile Development - iOS, Android & cross-platform apps  
🤖 AI & Machine Learning - Intelligent automation & analytics
☁️ Cloud Computing - Scalable infrastructure & migration
🏢 Enterprise Software - ERP, CRM & business automation
📊 Data Analytics & BI - Insights & business intelligence
🔒 Cybersecurity - Comprehensive security solutions
⛓️ Blockchain & Web3 - DeFi, NFTs & smart contracts
💡 Technology Consulting - Strategy & digital transformation

Quick Stats:
✅ 100+ successful projects delivered
✅ 99.9% client satisfaction rate
✅ 24/7 support & maintenance
✅ 6 months free post-launch support

How can I help you today? 🚀`,
        isBot: true,
        timestamp: new Date(),
        options: ["🌟 Our Services", "🏢 About Us", "📞 Contact Us", "💰 Get Quote", "📊 Case Studies"]
      };
      
      setMessages([welcomeMessage]);
    }
  }, [messages.length]);

  // Add message to chat
  const addMessage = useCallback((text: string, isBot: boolean, options?: string[]) => {
    const newMessage: Message = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      text,
      isBot,
      timestamp: new Date(),
      options,
      sentiment: isBot ? 'neutral' : detectSentiment(text)
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessageCount(prev => prev + 1);
    
    // Save to localStorage for persistence
    const savedMessages = JSON.parse(localStorage.getItem('aspencask_chat_history') || '[]');
    savedMessages.push(newMessage);
    if (savedMessages.length > 100) { // Keep only last 100 messages
      savedMessages.splice(0, savedMessages.length - 100);
    }
    localStorage.setItem('aspencask_chat_history', JSON.stringify(savedMessages));
  }, []);

  // Simple sentiment detection
  const detectSentiment = (text: string): 'positive' | 'neutral' | 'negative' => {
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'perfect', 'love', 'awesome', 'fantastic'];
    const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'disappointed', 'frustrated', 'poor'];
    
    const lowerText = text.toLowerCase();
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;
    
    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  };

  // Simulate typing indicator
  const simulateTyping = useCallback((duration: number = 1500) => {
    setIsTyping(true);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsTyping(false);
        resolve();
      }, duration);
    });
  }, []);

  // Handle quick option selection
  const handleQuickOption = useCallback(async (optionText: string) => {
    addMessage(optionText, false);
    
    await simulateTyping(1200);
    
    // Handle special actions
    if (optionText === "📅 Schedule Call") {
      window.open(`tel:+919608674820`, '_blank');
      addMessage(
        "📞 Opening phone dialer for +91 9608674820...\n\nBusiness Hours (IST):\n🕒 Monday - Friday: 9:00 AM - 8:00 PM\n🕒 Saturday: 10:00 AM - 6:00 PM\n🕒 24/7 Emergency Support Available\n\nWhat to expect:\n✅ Immediate technical consultation\n✅ Project requirements discussion\n✅ Custom quote within 24 hours\n✅ Expert guidance from our team\n\nFeel free to call us now for immediate assistance! 📲", 
        true, 
        ["🌟 Our Services", "📧 Send Email", "💰 Get Quote"]
      );
      return;
    }

    if (optionText === "📧 Send Email" || optionText === "📧 Send Requirements") {
      const subject = encodeURIComponent("Project Inquiry - AspenCask Solutions");
      const body = encodeURIComponent(`Hi AspenCask Solution LLP team,

I'm interested in learning more about your technology solutions and would like to discuss my project requirements.

PROJECT DETAILS:
• Type of solution needed: [Web/Mobile/AI/Cloud/Enterprise/Other]
• Project timeline: [When do you need it completed?]
• Budget range: [Your investment range]
• Specific requirements: [Brief description of your needs]
• Target audience: [Who will use this solution?]

CONTACT PREFERENCES:
• Best time to call: [Your preferred time]
• Preferred communication method: [Email/Phone/Video call]

Please contact me to schedule a detailed consultation.

Thank you!

Best regards,
[Your Name]
[Your Company]
[Your Phone]`);
      
      window.open(`mailto:support@aspencask.com?subject=${subject}&body=${body}`, '_blank');
      addMessage(
        "📧 Opening email client for support@aspencask.com...\n\nEmail Response Time:\n⚡ Within 2 hours during business hours\n📋 Detailed project quotes within 24 hours\n🤝 Discovery call scheduled within same day\n\nWhat to include in your email:\n• Project type & specific requirements\n• Timeline & budget considerations  \n• Contact preferences & availability\n• Any technical questions or concerns\n\nOur Email Commitment:\n✅ Personalized response from technical expert\n✅ Detailed project breakdown & recommendations\n✅ Transparent pricing with no hidden costs\n✅ Free 30-minute consultation offer\n\nThis helps us provide you with the most relevant and valuable information! 💼", 
        true, 
        ["🌟 Our Services", "📞 Contact Us", "📅 Schedule Call"]
      );
      return;
    }

    // Handle service categories
    if (serviceResponses[optionText]) {
      addMessage(serviceResponses[optionText], true, ["📞 Contact Us", "💰 Get Quote", "🔄 Other Services", "📊 Case Studies"]);
      return;
    }

    // Handle predefined options
    const option = quickOptions.find(opt => opt.text === optionText);
    if (option) {
      addMessage(option.response, true, option.options);
      return;
    }

    // Fallback response
    addMessage(
      "Thank you for your interest! 😊\n\nI'd be happy to provide more specific information about AspenCask Solution LLP. You can:\n\n• Choose from the quick options below for detailed information\n• Ask about specific services or technologies\n• Request a custom quote for your project\n• Schedule a consultation with our experts\n\nFor immediate assistance:\n📞 Phone: +91 9608674820\n📧 Email: support@aspencask.com\n\nAverage Response Time:\n• Chat: Instant\n• Phone: Immediate during business hours\n• Email: Within 2 hours\n\nHow can I help you further? 🚀", 
      true, 
      ["🌟 Our Services", "📞 Contact Us", "💰 Get Quote", "🏢 About Us"]
    );
  }, [addMessage, simulateTyping]);

  // Handle user message
  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    addMessage(userMessage, false);
    setInputValue('');

    await simulateTyping(1500);

    // Enhanced keyword matching
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for service-specific keywords
    const keywordResponse = getResponseByKeyword(userMessage);
    if (keywordResponse) {
      addMessage(keywordResponse, true, ["📞 Contact Us", "💰 Get Quote", "🔄 Other Services"]);
      return;
    }

    // Handle common queries
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('budget')) {
      handleQuickOption("💰 Get Quote");
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('call')) {
      handleQuickOption("📞 Contact Us");
    } else if (lowerMessage.includes('about') || lowerMessage.includes('company')) {
      handleQuickOption("🏢 About Us");
    } else if (lowerMessage.includes('service') || lowerMessage.includes('what do you do')) {
      handleQuickOption("🌟 Our Services");
    } else if (lowerMessage.includes('portfolio') || lowerMessage.includes('case study') || lowerMessage.includes('example')) {
      handleQuickOption("📊 Case Studies");
    } else {
      // Intelligent contextual response
      addMessage(
        `Thank you for your message! 🙏\n\nI understand you're interested in "${userMessage}". Let me help you with that!\n\nHere's how I can assist you:\n\n🎯 Get Specific Information - Choose from the options below\n💬 Direct Consultation - Speak with our experts immediately\n📋 Custom Proposal - Get a tailored solution for your needs\n📊 See Our Work - Review case studies and success stories\n\nQuick Response Options:\n• For technical questions → Choose "Our Services"\n• For project discussion → Choose "Contact Us"  \n• For pricing information → Choose "Get Quote"\n• For company information → Choose "About Us"\n\nDirect Contact (Fastest Response):\n📞 Call Now: +91 9608674820\n📧 Email: support@aspencask.com\n\nWhat would you like to explore first? 🚀`, 
        true, 
        ["🌟 Our Services", "📞 Contact Us", "💰 Get Quote", "🏢 About Us", "📊 Case Studies"]
      );
    }
  }, [inputValue, addMessage, simulateTyping, handleQuickOption]);

  // Handle file upload
  const handleFileUpload = useCallback(async (file: File) => {
    addMessage(`📎 Uploaded file: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`, false);
    
    await simulateTyping(1000);
    
    addMessage(
      "📎 File received successfully!\n\nThank you for sharing the file. Our team will review it and provide detailed feedback.\n\nNext Steps:\n1️⃣ Our technical team will analyze your file\n2️⃣ We'll provide feedback within 24 hours\n3️⃣ Schedule a call to discuss recommendations\n\nFor faster review:\n📞 Call us directly at +91 9608674820\n📧 Email us at support@aspencask.com\n\nWould you like to schedule a call to discuss this in detail? 📞",
      true,
      ["📅 Schedule Call", "📧 Send Email", "💰 Get Quote"]
    );
  }, [addMessage, simulateTyping]);

  // Handle voice recording
  const handleVoiceRecord = useCallback(async (audioBlob: Blob) => {
    addMessage("🎤 Voice message recorded", false);
    
    await simulateTyping(1000);
    
    addMessage(
      "🎤 Voice message received!\n\nThank you for the voice message. While I can't process audio directly yet, our team can listen to it and respond appropriately.\n\nFor immediate voice consultation:\n📞 Call us directly: +91 9608674820\n⏰ Available: Mon-Fri 9 AM - 8 PM IST\n\nAlternatively:\n• Type your question for instant response\n• Schedule a video call for detailed discussion\n• Send an email with your requirements\n\nHow would you prefer to continue? 🤔",
      true,
      ["📅 Schedule Call", "💬 Type Question", "📧 Send Email"]
    );
  }, [addMessage, simulateTyping]);

  // Export chat history
  const exportChatHistory = useCallback(() => {
    const chatData = {
      sessionId,
      timestamp: new Date().toISOString(),
      messages: messages.map(msg => ({
        text: msg.text,
        isBot: msg.isBot,
        timestamp: msg.timestamp.toISOString(),
        options: msg.options
      }))
    };
    
    const dataStr = JSON.stringify(chatData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `aspencask_chat_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, [sessionId, messages]);

  return {
    messages,
    inputValue,
    setInputValue,
    isTyping,
    messageCount,
    sessionId,
    addMessage,
    handleQuickOption,
    handleSendMessage,
    handleFileUpload,
    handleVoiceRecord,
    exportChatHistory,
    simulateTyping
  };
};