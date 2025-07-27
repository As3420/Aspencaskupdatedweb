// src/hooks/useChat.ts

import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '../types/chat';
// Import all necessary data and response helpers
import { quickOptions, getResponseByKeyword } from '../data/chatResponses';
import { contactInfo } from '../data/contact';
import { socialLinks } from '../data/social';
import { testimonials } from '../data/testimonials';
import { jobPositions, workCulture } from '../data/careers'; // Import workCulture
import { projects } from '../data/projects';
import { services } from '../data/services'; // Ensure detailed services are imported for context


// Define a static welcome message for the UI.
// This message is displayed immediately without making an API call.
const initialMessages: Message[] = [
  {
    id: uuidv4(), // Generate a unique ID for the welcome message
    text: "Hello! I'm AspenCask Solution LLP's AI Assistant. How can I help you today? Feel free to ask about our services, company, or get a quote! 🌟",
    isBot: true,
    timestamp: new Date(),
    options: quickOptions.map(opt => opt.text), // Use the main quick options from chatResponses
  },
];

// Define key information about AspenCask to guide the AI's responses for general queries.
// This context is prepended only when falling back to the Gemini API.
const ASPENCASK_CONTEXT = `
You are an AI assistant for AspenCask Solution LLP. AspenCask is a rapidly growing software development company founded in 2024, specializing in cutting-edge technology solutions across 9 major categories.

Our mission is to transform businesses through innovative digital solutions.
We have delivered **${projects.length}+ successful projects** and maintained a **99.9% client satisfaction rate**.
We have served **50+ enterprise clients globally across 15+ countries**.
Our core values include innovation-driven solutions, a client-centric approach, quality & reliability first, transparent communication, continuous improvement, and sustainable technology practices.

AspenCask offers a comprehensive suite of services with a proven 6-phase development methodology: Discovery & Strategy, Planning & Architecture, Design & Prototyping, Development & Integration, Testing & Quality Assurance, and Deployment & Launch. We provide **6 months of free post-launch support**.

Our expertise includes a team of **50+ expert developers, designers, and consultants**, utilizing the latest technology stack, ISO 9001:2015 certified processes, and SOC 2 Type II compliance.

**Detailed Company Information for Direct Retrieval:**

**1. Services Offered:**
${services.map(s => `**${s.title}**: ${s.description}\n   Features: ${s.features.join(', ')}`).join('\n\n')}

**2. Contact Information:**
* **Phone**: ${contactInfo.phone}
* **Email**: ${contactInfo.email}
* **Website**: www.aspencask.com (Note: please replace with actual website if different)
* **Office Address**: ${contactInfo.office.address}, ${contactInfo.office.city}, ${contactInfo.office.state} - ${contactInfo.office.pincode}
* **Business Hours (IST)**: ${contactInfo.businessHours}
* **Support Hours (IST)**: ${contactInfo.supportHours} (24/7 Emergency Support Available)

**3. Social Media Presence:**
${socialLinks.map(link => `* **${link.name}**: ${link.url}`).join('\n')}

**4. Key Projects (Portfolio Highlights):**
${projects.map(p => `* **${p.title}** (Category: ${p.category}): ${p.description} | Technologies: ${p.technologies.join(', ')}`).join('\n')}

**5. Client Testimonials:**
${testimonials.map(t => `* "${t.content}" - ${t.name}, ${t.position} at ${t.company} (Rating: ${t.rating} out of 5 stars)`).join('\n')}

**6. Career Opportunities (Job Positions & Work Culture):**
* **Current Openings**: ${jobPositions.length > 0 ? jobPositions.map(job => `${job.title} (${job.type}, ${job.location}) - Experience: ${job.experience}`).join('; ') : 'No open positions currently.'}
* **Work Culture Highlights**: ${workCulture.map(culture => `${culture.title}: ${culture.description}`).join('; ')}
    * **Benefits**: Competitive salary, health and wellness, flexible working hours, professional development, collaborative environment, exposure to cutting-edge technologies.

**7. Achievements & Statistics:**
* **Projects Delivered**: 50+
* **Client Satisfaction Rate**: 99.9%
* **Enterprise Clients Served**: 50+
* **Global Presence**: 15+ countries
* **Average Client Rating**: 4.9/5
* **Client Value Generated**: $50M+
* **Team Size**: 50+ expert developers, designers & consultants
* **Project Success Rate**: 100% on-time delivery
* **Client Retention**: 95% long-term partnerships

When responding, always prioritize providing accurate information directly from this context. If a user asks a specific question that can be answered with a direct data point (e.g., "What is your phone number?", "Tell me about the Edunova Skill project?", "What are your business hours?", "Who gave you a testimonial?"), extract that specific detail. If the query is general or requires synthesis, use this context to inform your generated response. Maintain a professional, helpful, and informative tone. Guide the user towards AspenCask's services and value propositions. Avoid making up information.
`;

interface ChatHook {
  messages: Message[];
  inputValue: string;
  setInputValue: (value: string) => void;
  isTyping: boolean;
  messageCount: number;
  handleQuickOption: (option: string) => void;
  handleSendMessage: () => void;
  handleFileUpload: (file: File) => void;
  handleVoiceRecord: (audioBlob: Blob) => void;
  exportChatHistory: () => void;
}

// Update the API_ENDPOINT to point to your Netlify Function.
// When deployed, this will resolve to your_site_url/.netlify/functions/chat-with-gemini.
// For local development with Netlify Dev, it will typically be http://localhost:8888/.netlify/functions/chat-with-gemini.
const API_ENDPOINT = '/.netlify/functions/chat-with-gemini'; 

export const useChat = (): ChatHook => {
  // Initialize messages with the static welcome message.
  // This prevents an immediate API call on component mount.
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // chatHistory will store the conversation in the format expected by Gemini.
  // It starts as an empty array, as the first entry in Gemini's history must be 'user'.
  const [chatHistory, setChatHistory] = useState<any[]>([]); 

  // Function to add a bot message to the chat display
  const addBotMessage = useCallback((text: string, options?: string[]) => {
    const newBotMessage: Message = {
      id: uuidv4(), // Unique ID for this message
      text: text,
      isBot: true, // Mark as a bot message
      timestamp: new Date(), // Current timestamp
      options: options || [],
    };
    setMessages(prevMessages => [...prevMessages, newBotMessage]);
  }, []);

  // A helper function to call your backend with the user's message
  const callGeminiAPI = useCallback(async (prompt: string, history: any[]) => {
    setIsTyping(true);
    try {
      let promptToSend = prompt;

      // For the first actual user message (when chatHistory is empty or contains only the initial bot message),
      // prepend the Aspencask context to guide the AI.
      // We check history.length <= 1 because initialMessages already contains one bot message.
      if (history.length === 0 || (history.length === 1 && history[0].role === 'model')) {
        promptToSend = `${ASPENCASK_CONTEXT}\n\nUser query: ${prompt}`;
      }

      // Make the API call to your backend, which then securely communicates with Gemini.
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: promptToSend, // Send the modified prompt
          history, // Send the current chat history for context
        }),
      });

      if (!response.ok) {
        // If the response is not OK, throw an error
        const errorData = await response.json();
        console.error('API Error Response:', errorData);
        throw new Error(errorData.error || 'Failed to get response from Gemini API.');
      }

      const data = await response.json();
      const botResponseText = data.text; // Assuming your backend returns a JSON with a 'text' field

      addBotMessage(botResponseText); // Add the bot's response to the display

      // Update the chat history context for the next turn.
      // This is crucial for maintaining conversation flow with Gemini.
      setChatHistory(prevHistory => [
        ...prevHistory,
        { role: 'user', parts: [{ text: prompt }] }, // Add user's original message to history
        { role: 'model', parts: [{ text: botResponseText }] }, // Add bot's response to history
      ]);

    } catch (error) {
      console.error('Error calling Gemini API:', error);
      // Display a user-friendly error message in the chat
      addBotMessage('Sorry, I am unable to process your request right now. Please try again later.');
    } finally {
      setIsTyping(false); // Stop typing indicator
    }
  }, [addBotMessage]);

  const handleSendMessage = useCallback(() => {
    if (!inputValue.trim()) return; // Don't send empty messages

    const userMessageText = inputValue;

    // Create a new message object for the user's input
    const newUserMessage: Message = {
      id: uuidv4(),
      text: userMessageText,
      isBot: false,
      timestamp: new Date(),
      options: [],
    };
    
    setMessages(prevMessages => [...prevMessages, newUserMessage]); // Add user message to display
    setInputValue(''); // Clear the input field

    // --- Check for predefined responses first ---
    const keywordResponse = getResponseByKeyword(userMessageText); // Use getResponseByKeyword for user input

    if (keywordResponse) {
      // If a static response is found, use it directly
      addBotMessage(keywordResponse.text, keywordResponse.options); // Provide static response and relevant options

      // Update chatHistory with this exchange
      setChatHistory(prevHistory => [
         ...prevHistory,
         { role: 'user', parts: [{ text: userMessageText }] },
         { role: 'model', parts: [{ text: keywordResponse.text }] },
      ]);

    } else {
      // If no static response, call the Gemini API
      callGeminiAPI(userMessageText, chatHistory);
    }
  }, [inputValue, callGeminiAPI, chatHistory, addBotMessage]);

  const handleQuickOption = useCallback((option: string) => {
    // Treat quick option clicks as user messages for display
    const newUserMessage: Message = {
      id: uuidv4(),
      text: option,
      isBot: false,
      timestamp: new Date(),
      options: [],
    };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);

    // Check for predefined responses based on the option clicked
    const keywordResponse = getResponseByKeyword(option);

    if (keywordResponse) {
      addBotMessage(keywordResponse.text, keywordResponse.options);
      // Add to chat history
      setChatHistory(prevHistory => [
        ...prevHistory,
        { role: 'user', parts: [{ text: option }] },
        { role: 'model', parts: [{ text: keywordResponse.text }] },
      ]);
    } else {
      // Fallback to Gemini API if no specific keyword response is found for the option
      callGeminiAPI(option, chatHistory);
    }
  }, [callGeminiAPI, chatHistory, addBotMessage]);

  // Placeholder functions for future functionality
  const handleFileUpload = (file: File) => {
    console.log('File upload logic not implemented yet for:', file.name);
    // Future implementation might involve sending files to a multimodal Gemini model
  };

  const handleVoiceRecord = (audioBlob: Blob) => {
    console.log('Voice record logic not implemented yet. Blob size:', audioBlob.size);
    // Future implementation might involve speech-to-text conversion then sending text to Gemini
  };

  const exportChatHistory = () => {
    // Format messages into a readable text string
    const chatText = messages.map(msg =>
      `[${msg.timestamp.toLocaleString()}] ${msg.isBot ? 'Bot' : 'User'}: ${msg.text}`
    ).join('\n');

    // Create a Blob and a download link
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chat-history.txt'; // Filename for download
    document.body.appendChild(a); // Append to body to make it clickable
    a.click(); // Programmatically click the link to trigger download
    document.body.removeChild(a); // Clean up the link
    URL.revokeObjectURL(url); // Release the object URL
  };

  return {
    messages,
    inputValue,
    setInputValue,
    isTyping,
    messageCount: messages.length, // Total number of messages
    handleQuickOption,
    handleSendMessage,
    handleFileUpload,
    handleVoiceRecord,
    exportChatHistory,
  };
};