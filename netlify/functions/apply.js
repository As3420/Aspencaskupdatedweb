const axios = require('axios');

exports.handler = async function (event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  // Replace with your Google Apps Script URL for submitting applications
  const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbyIYTWjg74MAR099N3-GU8GXfeuParlQYJ1O5vvVdEBkZa-WXr4_-Z2ndr5gpvnzZex/exec';

  try {
    const formData = JSON.parse(event.body);

    // Basic validation (add more as needed)
    if (!formData.email || !formData.name || !formData.position) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    const response = await axios.post(googleScriptUrl, formData);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Application submitted successfully',
        data: response.data,
      }),
    };
  } catch (error) {
    console.error('Job application error:', error);
    return {
      statusCode: error.response?.status || 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: error.message || 'Failed to submit application',
        details: error.response?.data || null,
      }),
    };
  }
};