// src/hooks/useChat.ts

import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '../types/chat';
import { quickOptions, getResponseByKeyword } from '../data/chatResponses'; // Import predefined responses

// Define a static welcome message for the UI.
// This message is displayed immediately without making an API call.
const initialMessages: Message[] = [
  {
    id: uuidv4(), // Generate a unique ID for the welcome message
    text: "Hello! I'm AspenCask's AI Assistant. How can I help you today?",
    isBot: true,
    timestamp: new Date(),
    options: quickOptions.map(opt => opt.text), // Use the main quick options from chatResponses
  },
];

// Define key information about AspenCask to guide the AI's responses for general queries.
// This context is prepended only when falling back to the Gemini API.
const ASPENCASK_CONTEXT = `
You are an AI assistant for AspenCask. AspenCask is a company dedicated to providing innovative and high-quality solutions in the technology sector, including web development, mobile development, AI/ML, cloud computing, enterprise software, data analytics, cybersecurity, blockchain/Web3, and technology consulting.
Our mission is to transform businesses through innovative digital solutions.
Our core values include client-centricity, innovation, integrity, and excellence.
When responding, keep AspenCask's focus and offerings in mind.
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
      // Example: Add quick options if the bot's response contains a specific phrase
      options: options || [],
    };
    setMessages(prevMessages => [...prevMessages, newBotMessage]);
  }, []);

  // A helper function to call your backend with the user's message
  const callGeminiAPI = useCallback(async (prompt: string, history: any[]) => {
    setIsTyping(true);
    try {
      let promptToSend = prompt;

      // For the first actual user message (when chatHistory is empty),
      // prepend the Aspencask context to guide the AI.
      if (history.length === 0) {
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
    const staticResponse = getResponseByKeyword(userMessageText);

    if (staticResponse) {
      // If a static response is found, use it directly
      addBotMessage(staticResponse);
      // Optionally, update chatHistory with this exchange if you want Gemini to be aware of it
      // setChatHistory(prevHistory => [
      //   ...prevHistory,
      //   { role: 'user', parts: [{ text: userMessageText }] },
      //   { role: 'model', parts: [{ text: staticResponse }] },
      // ]);
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

    // Find the corresponding quick option object
    const selectedOption = quickOptions.find(opt => opt.text === option);

    if (selectedOption && selectedOption.response) {
      // Use the predefined response
      addBotMessage(selectedOption.response, selectedOption.options);
      // Optionally, update chatHistory with this exchange if you want Gemini to be aware of it
      // setChatHistory(prevHistory => [
      //   ...prevHistory,
      //   { role: 'user', parts: [{ text: option }] },
      //   { role: 'model', parts: [{ text: selectedOption.response }] },
      // ]);
    } else {
      // If no predefined response or options, or if it's a dynamic option not covered by static responses,
      // fall back to Gemini API (e.g., "Yes", "No" from previous example)
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
