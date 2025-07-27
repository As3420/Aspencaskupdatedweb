// netlify/functions/chat-with-gemini.js

// Import necessary modules using ES module syntax for Netlify Functions
import { GoogleGenerativeAI } from '@google/generative-ai';
// Note: express and cors are not needed here as Netlify handles the HTTP request directly
// and CORS headers will be set in the response.

// Initialize the Google Generative AI with the hardcoded API key.
// WARNING: Hardcoding API keys is NOT recommended for production environments.
// For Netlify Functions, it's best to set this as an environment variable in Netlify UI.
// Example: const API_KEY = process.env.GEMINI_API_KEY;
const API_KEY = 'AIzaSyBe_MUvk2yqpb5OlOIyxdgEneiiPOTstFg'; 
const genAI = new GoogleGenerativeAI(API_KEY);

// Use the 'gemini-1.5-flash' model for better free-tier compatibility and efficiency.
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// The main handler for the Netlify Function
exports.handler = async (event, context) => {
  // Set CORS headers for all responses
  const headers = {
    'Access-Control-Allow-Origin': '*', // Allow requests from any origin (for development)
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS', // Allow POST and OPTIONS methods
  };

  // Handle preflight OPTIONS request for CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Successful preflight request' }),
    };
  }

  // Ensure it's a POST request
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  let prompt;
  let history;

  try {
    const body = JSON.parse(event.body);
    prompt = body.prompt;
    history = body.history;

    if (!prompt) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Prompt is required' }),
      };
    }

  } catch (parseError) {
    console.error('Error parsing request body:', parseError);
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Invalid JSON body' }),
    };
  }

  try {
    // Start a chat session with the provided history
    // The history array should alternate between 'user' and 'model' roles,
    // and the first entry (if history is not empty) must be 'user'.
    const chat = model.startChat({ history: history });
    
    // Send the user's prompt to the Gemini model
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();

    // Return the AI's response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ text }),
    };
  } catch (error) {
    console.error('Error communicating with Gemini:', error);
    // Attempt to parse specific Gemini API errors for better client feedback
    let errorMessage = 'Failed to get a response from the AI.';
    if (error.errorDetails && Array.isArray(error.errorDetails) && error.errorDetails.length > 0) {
      const quotaFailure = error.errorDetails.find(detail => detail['@type'] === 'type.googleapis.com/google.rpc.QuotaFailure');
      if (quotaFailure) {
        errorMessage = 'You have exceeded your Gemini API quota. Please try again later or consider upgrading your plan.';
      } else if (error.errorDetails[0] && error.errorDetails[0].message) {
        errorMessage = error.errorDetails[0].message;
      }
    } else if (error.message) {
      errorMessage = error.message;
    }

    return {
      statusCode: error.status || 500, // Use Gemini's status code if available, otherwise 500
      headers,
      body: JSON.stringify({ error: errorMessage }),
    };
  }
};
