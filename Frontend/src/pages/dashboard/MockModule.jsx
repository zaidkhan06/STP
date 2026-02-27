import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMock, submitMock } from "../../services/aptitudeService";

function MockModule() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 min
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const navigate = useNavigate();

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
    const res = await getMock();
    setQuestions(res);
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
    console.log(formatted, timeLeft);
    const res = await submitMock(formatted, timeLeft);
    setResult(res);
    setSubmitted(true);
  };

  if (!questions.length)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-white/5 border border-white/10 rounded-3xl px-8 py-6 text-white text-center">
          <p className="text-lg font-medium">Preparing your mock test...</p>
          <p className="text-sm text-gray-400 mt-1">
            Please wait while we load the questions.
          </p>
        </div>
      </div>
    );

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto text-white">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center space-y-4">
          <h2 className="text-3xl font-bold">Mock Result</h2>
          <p className="text-lg">
            Score:{" "}
            <span className="font-semibold">
              {result.score} / {result.total}
            </span>
          </p>
          <p className="text-2xl font-semibold text-purple-400">
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

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

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
            <span>Exit Test</span>
          </button>
          <div>
            <h1 className="text-xl font-semibold">Mock Aptitude Test</h1>
            <p className="text-xs text-gray-400">
              Answer all questions before the timer runs out.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs text-gray-400">
            Question{" "}
            <span className="font-semibold text-white">
              {current + 1}/{questions.length}
            </span>
          </div>
          <div className="px-4 py-2 rounded-full bg-red-500/10 border border-red-500/40 text-sm font-mono text-red-300">
            Time Left: {formattedTime}
          </div>
        </div>
      </div>

      {/* Main test card */}
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
              onClick={() => handleSelect(i)}
              className={`w-full text-left px-5 py-4 rounded-2xl border transition flex gap-3 ${
                answers[question._id] === i
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

        {/* Navigation */}
        <div className="pt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <button
              disabled={current === 0}
              onClick={() => setCurrent((p) => p - 1)}
              className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/10 transition"
            >
              Previous
            </button>

            {current < questions.length - 1 && (
              <button
                onClick={() => setCurrent((p) => p + 1)}
                className="px-5 py-2.5 rounded-xl bg-purple-600/40 hover:bg-purple-600/60 text-sm transition"
              >
                Save & Next
              </button>
            )}
          </div>

          {current === questions.length - 1 && (
            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 rounded-xl bg-emerald-500/80 hover:bg-emerald-500 text-sm font-medium transition self-start sm:self-auto"
            >
              Submit Test
            </button>
          )}
        </div>
      </div>

      {/* Exit confirmation modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60">
          <div className="bg-[#050816] border border-white/10 rounded-2xl p-6 w-full max-w-md text-white space-y-4">
            <h3 className="text-lg font-semibold">
              Are you sure you want to exit?
            </h3>
            <p className="text-sm text-gray-400">
              If you go back now, your current progress in this mock test
              may be lost.
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
                Yes, Exit Test
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MockModule;