import CodingQuestion from "../models/codingQuestion.model.js";
import User from "../models/user.model.js";


// CREATE QUESTION (Admin)
export const createCodingQuestion = async (req, res) => {
  try {
    const {
      title,
      description,
      difficulty,
      tags,
      platform,
      link,
      companyTags
    } = req.body;

    const question = await CodingQuestion.create({
      title,
      description,
      difficulty,
      tags,
      platform,
      link,
      companyTags,
      createdBy: req.user
    });

    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL QUESTIONS
export const getCodingQuestions = async (req, res) => {
  try {
    const questions = await CodingQuestion.find().sort({
      createdAt: -1
    });

    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};




export const toggleSolved = async (req, res) => {
  try {
    const userId = req.user;
    const questionId = req.params.id;

    // Check if question exists
    const question = await CodingQuestion.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    const user = await User.findById(userId);

    const alreadySolved = user.solvedCoding.includes(questionId);

    if (alreadySolved) {
      user.solvedCoding.pull(questionId);
    } else {
      user.solvedCoding.push(questionId);
    }

    await user.save();

    res.json({
      message: alreadySolved
        ? "Removed from solved"
        : "Marked as solved",
      solvedCoding: user.solvedCoding
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getSolvedQuestions = async (req, res) => {
  try {
    const userId = req.user;
    const user = await User.findById(userId);
    if(!user){
      return res.status(400).json({success: false, message: "User not found"});
    }
    return res.status(200).json({
      success: true,
      solvedCoding: user.solvedCoding
    })

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}