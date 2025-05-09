require('dotenv').config();
const fetch = require('node-fetch');

async function explainWithAI(prompt) {
  try {
    const response = await fetch('https://api.x.ai/v1/explain', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.XAI_API_KEY}`,
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.explanation;
  } catch (error) {
    console.error('Error in explainWithAI:', error);
    throw error;
  }
}

module.exports = { explainWithAI };
