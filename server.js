import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  try {
    const response = await axios.post(
      'https://script.google.com/macros/s/AKfycbxVYV5Uc4E1BUF3xcUEAr1yumkyLw2UYf8OFe9Eb1aJNhLeuOqZA_fZxj1VwIBidRqf/exec',
      req.body
    );
    res.json(response.data);
  } catch (error) {
    console.error('Proxy error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => console.log('Proxy server running on http://localhost:3001'));