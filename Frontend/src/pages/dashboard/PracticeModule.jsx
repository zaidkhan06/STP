import { useEffect, useState } from "react";
import axios from "axios";

function PracticeModule({ category }) {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, [category]);

  const fetchQuestions = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/aptitude/category/${category}`,
      { withCredentials: true }
    );
    console.log(res);
    setQuestions(res.data);
  };

  const handleCheck = async () => {
    if (selected === null) return;

    const questionId = questions[current]._id;

    const res = await axios.post(
      "http://localhost:5000/api/aptitude/check",
      {
        questionId,
        selectedAnswer: selected
      },
      { withCredentials: true }
    );
    console.log(res);


    setFeedback(res.data);

    setAnswers((prev) => ({
      ...prev,
      [questionId]: selected
    }));
  };

  const handleNext = () => {
    setSelected(null);
    setFeedback(null);
    setCurrent((prev) => prev + 1);
  };

  const handleSubmit = async () => {
    const formattedAnswers = Object.entries(answers).map(
      ([questionId, selectedAnswer]) => ({
        questionId,
        selectedAnswer
      })
    );

    const res = await axios.post(
      "http://localhost:5000/api/aptitude/practice/submit",
      {
        answers: formattedAnswers,
        category,
        duration: 0
      },
      { withCredentials: true }
    );
    console.log(res);

    setResult(res.data);
    setShowResult(true);
  };

  if (!questions.length)
    return <div className="text-white">Loading...</div>;

  if (showResult) {
    return (
      <div className="text-white text-center bg-white/5 p-10 rounded-3xl backdrop-blur-xl">
        <h2 className="text-3xl font-bold mb-4">
          Practice Result
        </h2>

        <p className="text-xl mb-2">
          Score: {result.score} / {result.total}
        </p>

        <p className="text-lg text-purple-400">
          {result.percentage.toFixed(2)}%
        </p>
      </div>
    );
  }

  const question = questions[current];

  return (
    <div className="max-w-3xl mx-auto text-white">

      <div className="mb-4 text-sm text-gray-400">
        Question {current + 1} of {questions.length}
      </div>

      <h3 className="text-xl font-semibold mb-6">
        {question.question}
      </h3>

      <div className="space-y-4">
        {question.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`w-full text-left px-5 py-4 rounded-xl border transition ${
              selected === i
                ? "bg-purple-600/20 border-purple-500"
                : "bg-white/5 border-white/10"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {feedback && (
        <div
          className={`mt-6 p-4 rounded-xl ${
            feedback.correct
              ? "bg-green-600/20 text-green-400"
              : "bg-red-600/20 text-red-400"
          }`}
        >
          {feedback.correct
            ? "Correct Answer!"
            : `Wrong. Correct option is ${
                question.options[feedback.correctAnswer]
              }`}
        </div>
      )}

      <div className="mt-8 flex justify-between">

        <button
          onClick={handleCheck}
          disabled={selected === null}
          className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 disabled:opacity-50"
        >
          Check
        </button>

        {current < questions.length - 1 ? (
          <button
            onClick={handleNext}
            className="px-6 py-2 rounded-xl bg-white/10"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-xl bg-green-600/30"
          >
            Submit
          </button>
        )}

      </div>

    </div>
  );
}

export default PracticeModule;