import { useEffect, useState } from "react";
import axios from "axios";

function MockModule() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 min
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetchMock();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) handleSubmit();

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const fetchMock = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/aptitude/mock/start?limit=20",
      { withCredentials: true }
    );
    setQuestions(res.data);
  };

  const handleSelect = (index) => {
    const questionId = questions[current]._id;

    setAnswers((prev) => ({
      ...prev,
      [questionId]: index
    }));
  };

  const handleSubmit = async () => {
    const formatted = Object.entries(answers).map(
      ([questionId, selectedAnswer]) => ({
        questionId,
        selectedAnswer
      })
    );

    const res = await axios.post(
      "http://localhost:5000/api/aptitude/mock/submit",
      {
        answers: formatted,
        duration: 600 - timeLeft
      },
      { withCredentials: true }
    );

    setResult(res.data);
    setSubmitted(true);
  };

  if (!questions.length)
    return <div className="text-white">Loading...</div>;

  if (submitted) {
    return (
      <div className="text-white text-center p-10 bg-white/5 rounded-3xl">
        <h2 className="text-3xl font-bold mb-4">
          Mock Result
        </h2>
        <p>Score: {result.score} / {result.total}</p>
        <p className="text-purple-400">
          {result.percentage.toFixed(2)}%
        </p>
      </div>
    );
  }

  const question = questions[current];

  return (
    <div className="max-w-3xl mx-auto text-white">

      <div className="flex justify-between mb-4">
        <span>
          Question {current + 1} / {questions.length}
        </span>
        <span className="text-red-400">
          Time Left: {timeLeft}s
        </span>
      </div>

      <h3 className="text-xl font-semibold mb-6">
        {question.question}
      </h3>

      <div className="space-y-4">
        {question.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            className={`w-full text-left px-5 py-4 rounded-xl border transition ${
              answers[question._id] === i
                ? "bg-purple-600/20 border-purple-500"
                : "bg-white/5 border-white/10"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="mt-8 flex justify-between">

        <button
          disabled={current === 0}
          onClick={() => setCurrent((p) => p - 1)}
          className="px-6 py-2 bg-white/10 rounded-xl"
        >
          Previous
        </button>

        {current < questions.length - 1 ? (
          <button
            onClick={() => setCurrent((p) => p + 1)}
            className="px-6 py-2 bg-white/10 rounded-xl"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-green-600/30 rounded-xl"
          >
            Submit
          </button>
        )}

      </div>

    </div>
  );
}

export default MockModule;