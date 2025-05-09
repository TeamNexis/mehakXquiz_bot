const { Scenes } = require('telegraf');
const Question = require('../../db/models/questionModel');
const User = require('../../db/models/userModel');
const QuizAttempt = require('../../db/models/quizAttemptModel');
const { getExplanation } = require('../../services/aiExplainer');
const { calculateScore } = require('../../logic/scoring');
const { adjustDifficulty } = require('../../logic/difficultyAdaptation');

const QuizScene = new Scenes.BaseScene('quiz');

QuizScene.enter(async (ctx) => {
  const userId = ctx.from.id.toString();
  const user = await User.findOne({ userId });
  if (!user) {
    await ctx.reply('Please start with /start first.');
    return ctx.scene.leave();
  }
  const questions = await Question.aggregate([
    { $match: { _id: { $nin: user.seenQuestions }, difficulty: { $lte: user.stats.difficultyLevel } } },
    { $sample: { size: 10 } },
  ]);
  if (questions.length < 10) {
    await ctx.reply('Not enough questions available. Please try later.');
    return ctx.scene.leave();
  }
  const quizAttempt = new QuizAttempt({
    userId,
    startTime: new Date(),
    questions: questions.map(q => ({ questionId: q._id, correctAnswer: q.correctAnswer })),
    totalQuestions: 10,
  });
  await quizAttempt.save();
  ctx.scene.state.quizAttemptId = quizAttempt._id.toString();
  ctx.scene.state.currentQuestionIndex = 0;
  ctx.scene.state.questions = questions;
  sendQuestion(ctx);
});

function sendQuestion(ctx) {
  const state = ctx.scene.state;
  const index = state.currentQuestionIndex;
  const question = state.questions[index];
  state.questionStartTime = Date.now();
  const options = question.options;
  const keyboard = options.map((opt, i) => [{ text: opt, callback_data: `answer_${i}` }]);
  ctx.replyWithHTML(`<b>${question.questionText}</b>`, {
    reply_markup: {
      inline_keyboard: keyboard,
    },
  });
  const timer = setTimeout(() => {
    handleAnswer(ctx, null);
  }, 60000);
  state.timer = timer;
}

QuizScene.action(/answer_(\d+)/, async (ctx) => {
  const [, answerIndex] = ctx.match;
  clearTimeout(ctx.scene.state.timer);
  handleAnswer(ctx, answerIndex);
});

async function handleAnswer(ctx, answerIndex) {
  const state = ctx.scene.state;
  const index = state.currentQuestionIndex;
  const question = state.questions[index];
  const userAnswer = answerIndex !== null ? question.options[answerIndex] : 'No answer';
  const correctAnswer = question.correctAnswer;
  const responseTime = (Date.now() - state.questionStartTime) / 1000;
  const quizAttempt = await QuizAttempt.findById(state.quizAttemptId);
  quizAttempt.questions[index] = {
    questionId: question._id,
    userAnswer,
    correctAnswer,
    responseTime,
  };
  await quizAttempt.save();
  state.currentQuestionIndex += 1;
  if (state.currentQuestionIndex < state.questions.length) {
    sendQuestion(ctx);
  } else {
    await calculateScoreAndUpdateUser(ctx, quizAttempt);
  }
}

async function calculateScoreAndUpdateUser(ctx, quizAttempt) {
  const score = calculateScore(quizAttempt);
  quizAttempt.score = score;
  quizAttempt.endTime = new Date();
  await quizAttempt.save();
  const userId = ctx.from.id.toString();
  const user = await User.findOne({ userId });
  user.stats.totalQuizzes += 1;
  user.stats.accuracy = ((user.stats.accuracy * user.stats.totalQuizzes + score / 10) / (user.stats.totalQuizzes + 1));
  user.stats.averageResponseTime = ((user.stats.averageResponseTime * user.stats.totalQuizzes + quizAttempt.questions.reduce((sum, q) => sum + q.responseTime, 0) / 10) / (user.stats.totalQuizzes + 1));
  user.seenQuestions = [...new Set([...user.seenQuestions, ...quizAttempt.questions.map(q => q.questionId)])];
  user.stats.difficultyLevel = adjustDifficulty(user, score, 10);
  await user.save();
  await ctx.reply(`Quiz completed! 🎉 Your score: ${score}/10`);
  for (let i = 0; i < quizAttempt.questions.length; i++) {
    const q = quizAttempt.questions[i];
    if (q.userAnswer !== q.correctAnswer) {
      const question = state.questions[i];
      let explanation = question.explanation;
      if (!explanation) {
        explanation = await getExplanation(question.questionText, q.correctAnswer);
        await Question.findByIdAndUpdate(q.questionId, { explanation });
      }
      await ctx.reply(`Question ${i+1}: Correct answer is ${q.correctAnswer}. Explanation: ${explanation}`);
    }
  }
  ctx.scene.leave();
}

module.exports = QuizScene;