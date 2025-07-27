// server.js
import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import cors from 'cors';

const app = express();
const port = 3001;

// Initialize the Google Generative AI with the hardcoded API key
// WARNING: Hardcoding API keys is NOT recommended for production environments.
const API_KEY = 'AIzaSyBe_MUvk2yqpb5OlOIyxdgEneiiPOTstFg'; 
const genAI = new GoogleGenerativeAI(API_KEY);

// FIX: Changed the model name to 'gemini-1.5-flash' for better free-tier compatibility.
// This model is optimized for speed and cost-efficiency.
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

app.use(cors()); // Enable CORS for front-end communication
app.use(express.json());

app.post('/api/chat-with-gemini', async (req, res) => {
  const { prompt, history } = req.body;

  try {
    const chat = model.startChat({ history: history });
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ text });
  } catch (error) {
    console.error('Error communicating with Gemini:', error);
    res.status(500).json({ error: 'Failed to get a response from the AI.' });
  }
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
