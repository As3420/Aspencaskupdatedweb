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

  // Google Script URL for newsletter subscriptions
  const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbzzm9u-3O0336SeaB6DgFZFVTDes6yNWB7lO9oK0W2iteuK9MbYTpxe9wf-UoISlKnB/exec';

  try {
    // The form data from your React component is in event.body
    const formData = JSON.parse(event.body);

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid email address' }),
      };
    }

    // Forward the POST request to your Google Script
    const response = await axios.post(googleScriptUrl, {
      email: formData.email,
      timestamp: new Date().toISOString(),
      source: 'website_newsletter'
    });

    // Return a success response to your React component
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Successfully subscribed to newsletter',
        data: response.data
      }),
    };

  } catch (error) {
    console.error('Newsletter subscription error:', error);

    // Return an error response
    return {
      statusCode: error.response?.status || 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        error: error.message || 'Failed to subscribe to newsletter',
        details: error.response?.data || null
      }),
    };
  }
};
