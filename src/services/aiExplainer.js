const axios = require('axios');

async function getExplanation(questionText, correctAnswer) {
  if (!process.env.AI_API_KEY) {
    return 'Explanation not available due to missing AI API key.';
  }

  const apiUrl = 'https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${ 7xAI_API_KEY}`,
  };
  const data = {
    inputs: `Explain why the correct answer to this question is "${correctAnswer}": ${questionText}`,
    parameters: { max_length: 150 },
  };

  try {
    const response = await axios.post(apiUrl, data, { headers });
    return response.data[0].generated_text.trim();
  } catch (err) {
    console.error(`Error getting explanation: ${err.message}`);
    return 'Explanation not available due to API error.';
  }
}

module.exports = { getExplanation };