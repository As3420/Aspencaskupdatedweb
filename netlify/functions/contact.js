const axios = require('axios');

// The handler function is the entry point for the serverless function
exports.handler = async function (event, context) {
  // We only want to handle POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbxVYV5Uc4E1BUF3xcUEAr1yumkyLw2UYf8OFe9Eb1aJNhLeuOqZA_fZxj1VwIBidRqf/exec';

  try {
    // The form data from your React component is in event.body
    const formData = JSON.parse(event.body);

    // Forward the POST request to your Google Script
    const response = await axios.post(googleScriptUrl, formData);

    // Return a success response to your React component
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error('Proxy error:', error);

    // Return an error response
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

