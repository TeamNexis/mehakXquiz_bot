const axios = require('axios');
const pdf = require('pdf-parse');
const Question = require('../db/models/questionModel');

async function fetchQuestions(subject = 'all') {
  const sources = {
    Physics: ['https://neet.nta.nic.in/previous-year-question-papers'],
    Chemistry: ['https://neet.nta.nic.in/previous-year-question-papers'],
    Biology: ['https://neet.nta.nic.in/previous-year-question-papers'],
    'Design Aptitude': ['https://www.nid.edu/examination/sample-papers']
  };

  const subjects = subject === 'all' ? Object.keys(sources) : [subject];

  for (const subj of subjects) {
    const urls = sources[subj];
    for (const url of urls) {
      try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const data = await pdf(response.data);
        const questions = parseQuestions(data.text, subj);
        for (const q of questions) {
          try {
            await Question.updateOne(
              { subject: q.subject, questionText: q.questionText },
              q,
              { upsert: true }
            );
          } catch (err) {
            console.error(`Error saving question: ${err.message}`);
          }
        }
      } catch (err) {
        console.error(`Error fetching questions for ${subj}: ${err.message}`);
      }
    }
  }
}

function parseQuestions(text, subject) {
  // Placeholder: Implement parsing logic based on source format
  // Example: Extract questionText, options, correctAnswer, etc.
  // Return an array of question objects
  return [];
}

module.exports = { fetchQuestions };