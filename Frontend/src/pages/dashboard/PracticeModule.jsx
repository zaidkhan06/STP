import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkPractice, getQuestions, practiceSubmit } from "../../services/aptitudeService";

function PracticeModule({ category }) {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, [category]);

  const fetchQuestions = async () => {
    const res = await getQuestions(category);
    setQuestions(res);
  };

  const handleCheck = async () => {
    if (selected === null) return;

    const questionId = questions[current]._id;

    const res = await checkPractice(questionId, selected);
    setFeedback(res);
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

    const res = await practiceSubmit(formattedAnswers, category)
    setResult(res);
    setShowResult(true);
  };

  if (!questions.length)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-white/5 border border-white/10 rounded-3xl px-8 py-6 text-white text-center">
          <p className="text-lg font-medium">Preparing your practice set...</p>
          <p className="text-sm text-gray-400 mt-1">
            Please wait while we load the questions.
          </p>
        </div>
      </div>
    );

  if (showResult) {
    return (
      <div className="max-w-3xl mx-auto text-white">
        <div className="text-white text-center bg-white/5 p-10 rounded-3xl backdrop-blur-xl space-y-4 border border-white/10">
          <h2 className="text-3xl font-bold">Practice Result</h2>
          <p className="text-xl">
            Score:{" "}
            <span className="font-semibold">
              {result.score} / {result.total}
            </span>
          </p>
          <p className="text-2xl text-purple-400 font-semibold">
            {result.percentage.toFixed(2)}%
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-6 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition text-sm"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const question = questions[current];

  return (
    <div className="max-w-4xl mx-auto text-white">
      {/* Header / Top bar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowExitConfirm(true)}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition"
          >
            <span className="text-lg leading-none">←</span>
            <span>Exit Practice</span>
          </button>
          <div>
            <h1 className="text-xl font-semibold">Practice Mode</h1>
            <p className="text-xs text-gray-400">
              Topic: <span className="font-medium text-white">{category}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span>
            Question{" "}
            <span className="font-semibold text-white">
              {current + 1}/{questions.length}
            </span>
          </span>
        </div>
      </div>

      {/* Main practice card */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
        {/* Progress bar */}
        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-purple-500 transition-all"
            style={{
              width: `${((current + 1) / questions.length) * 100}%`
            }}
          />
        </div>

        {/* Question */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold leading-relaxed">
            {question.question}
          </h3>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`w-full text-left px-5 py-4 rounded-2xl border transition flex gap-3 ${
                selected === i
                  ? "bg-purple-600/30 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              <span className="w-7 h-7 flex items-center justify-center rounded-full border border-white/20 text-xs shrink-0">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="text-sm sm:text-base">{opt}</span>
            </button>
          ))}
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            className={`mt-4 p-4 rounded-xl text-sm sm:text-base ${
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

        {/* Controls */}
        <div className="pt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={handleCheck}
            disabled={selected === null}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
          >
            Check Answer
          </button>

          {current < questions.length - 1 ? (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm transition self-start sm:self-auto"
            >
              Next Question
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 rounded-xl bg-emerald-500/80 hover:bg-emerald-500 text-sm font-medium transition self-start sm:self-auto"
            >
              Finish Practice
            </button>
          )}
        </div>
      </div>

      {/* Exit confirmation modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60">
          <div className="bg-[#050816] border border-white/10 rounded-2xl p-6 w-full max-w-md text-white space-y-4">
            <h3 className="text-lg font-semibold">
              Are you sure you want to exit practice?
            </h3>
            <p className="text-sm text-gray-400">
              If you go back now, your current progress in this practice
              session may be lost.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-sm transition"
              >
                Cancel
              </button>
              <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 rounded-xl bg-red-600/80 hover:bg-red-600 text-sm transition"
              >
                Yes, Exit Practice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PracticeModule;