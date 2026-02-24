import AptitudeAttempt from "../models/aptitudeAttempt.model.js";
import AptitudeQuestion from "../models/aptitudeQuestion.model.js";
import User from "../models/user.model.js";

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

    await User.findByIdAndUpdate(userId, {
      $push: { aptitudeAttempts: attempt._id }
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
    console.log(req.body);
    const userId = req.user;
    console.log(req.user);

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

   const attempt =  await AptitudeAttempt.create({
      user: userId,
      mode: "mock",
      questions: evaluated,
      score,
      totalQuestions: answers.length,
      percentage,
      duration
    });

    await User.findByIdAndUpdate(userId, {
      $push: { aptitudeAttempts: attempt._id }
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


//---------------------------

export const getProfileAnalytics = async (req, res) => {
    try {
        const userId = req.user;
        const attempts = await AptitudeAttempt.find({ user: userId })
            .sort({ createdAt: 1 });

        if (!attempts.length) {
            return res.json({
                totalAttempts: 0,
                bestScore: 0,
                averageScore: 0,
                overallAccuracy: 0,
                performanceTrend: [],
                averageDuration: 0
            });
        }

        const totalAttempts = attempts.length;

        let totalScore = 0;
        let totalQuestions = 0;
        let totalDuration = 0;
        let bestScore = 0;

        const performanceTrend = attempts.map((a) => {
            totalScore += a.percentage;
            totalQuestions += a.totalQuestions;
            totalDuration += a.duration;

            if (a.percentage > bestScore) {
                bestScore = a.percentage;
            }

            return {
                date: a.createdAt,
                percentage: a.percentage
            };
        });

        const averageScore = totalScore / totalAttempts;
        const overallAccuracy = totalScore / totalAttempts;
        const averageDuration = totalDuration / totalAttempts;

        res.json({
            totalAttempts,
            bestScore: Math.round(bestScore),
            averageScore: Math.round(averageScore),
            overallAccuracy: Math.round(overallAccuracy),
            performanceTrend,
            averageDuration: Math.round(averageDuration)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });

    }
}

export const getProfile = async (req, res) =>{
    try {
        const user = await User.findById(req.user).select(
            "name email role createdAt emailVerified"
        );

        res.json(user);
    } catch (error) {
        res.status(500).json({message: "Server error"});
        
    }
}