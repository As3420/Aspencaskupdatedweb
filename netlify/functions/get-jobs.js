const axios = require('axios');

exports.handler = async function (event, context) {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  // Replace with your Google Apps Script URL for fetching job positions
  const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbx9UtI7ds07LPopluF_X0JWOoUk4EThF7iZ0CxFHKSM5pPePL1H-TBhnRJu_LqqfsA/exec';

  try {
    const response = await axios.get(googleScriptUrl);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error('Failed to fetch job positions:', error);
    return {
      statusCode: error.response?.status || 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: error.message || 'Failed to fetch job positions',
        details: error.response?.data || null,
      }),
    };
  }
};