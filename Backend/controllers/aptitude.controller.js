import AptitudeAttempt from "../models/aptitudeAttempt.model.js";
import AptitudeQuestion from "../models/aptitudeQuestion.model.js";

export const submitPractice = async (req, res) => {
  try {
    const { answers, category, duration } = req.body;
    const userId = req.user;

    let score = 0;

    const evaluatedAnswers = [];

    for (let ans of answers) {
      const question = await AptitudeQuestion.findById(
        ans.questionId
      );

      const isCorrect =
        question.correctAnswer === ans.selectedAnswer;

      if (isCorrect) score++;

      evaluatedAnswers.push({
        questionId: ans.questionId,
        selectedAnswer: ans.selectedAnswer,
        correct: isCorrect
      });
    }

    const percentage =
      (score / answers.length) * 100;

    const attempt = await AptitudeAttempt.create({
      user: userId,
      mode: "practice",
      category,
      questions: evaluatedAnswers,
      score,
      totalQuestions: answers.length,
      percentage,
      duration
    });

    res.json({
      score,
      total: answers.length,
      percentage,
      attemptId: attempt._id
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export const getQuestionsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const questions = await AptitudeQuestion.find({
      category
    }).select("-correctAnswer"); // hide correct answer

    res.json(questions);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// CHECK ANSWER (Practice Mode)
export const checkAnswer = async (req, res) => {
  try {
    const { questionId, selectedAnswer } = req.body;

    const question = await AptitudeQuestion.findById(questionId);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    const isCorrect =
      question.correctAnswer === selectedAnswer;

    res.json({
      correct: isCorrect,
      correctAnswer: question.correctAnswer
    });

  } catch (error) {
    console.error("CHECK ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const startMockTest = async (req, res) => {
  try {
    const { limit = 20 } = req.query;

    const questions = await AptitudeQuestion.aggregate([
      { $sample: { size: parseInt(limit) } }
    ]);

    // remove correctAnswer
    const sanitized = questions.map((q) => ({
      _id: q._id,
      question: q.question,
      options: q.options,
      category: q.category,
      difficulty: q.difficulty
    }));

    res.json(sanitized);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const submitMockTest = async (req, res) => {
  try {
    const { answers, duration } = req.body;
    const userId = req.user;

    let score = 0;
    const evaluated = [];

    for (let ans of answers) {
      const question = await AptitudeQuestion.findById(ans.questionId);

      const isCorrect =
        question.correctAnswer === ans.selectedAnswer;

      if (isCorrect) score++;

      evaluated.push({
        questionId: ans.questionId,
        selectedAnswer: ans.selectedAnswer,
        correct: isCorrect
      });
    }

    const percentage = (score / answers.length) * 100;

    await AptitudeAttempt.create({
      user: userId,
      mode: "mock",
      questions: evaluated,
      score,
      totalQuestions: answers.length,
      percentage,
      duration
    });

    res.json({
      score,
      total: answers.length,
      percentage
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};