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