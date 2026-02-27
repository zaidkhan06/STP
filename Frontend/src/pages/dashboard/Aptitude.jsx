import { useState } from "react";
import PracticeModule from "./PracticeModule";
import MockModule from "./MockModule";
// import MockModule from "./MockModule"; // later

function Aptitude() {
  const [mode, setMode] = useState(null);
  const [category, setCategory] = useState(null);

  const topics = ["quantitative", "logical", "verbal"];

  // Step 1 — Choose Mode
  if (!mode) {
    return (
      <div className="text-white max-w-5xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Aptitude Practice
            </h1>
            <p className="text-sm sm:text-base text-gray-400 mt-1 max-w-xl">
              Sharpen your quantitative, logical and verbal skills with guided
              practice or full-length mock tests.
            </p>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm text-gray-300">
            <p>
              Choose a mode to get started.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <button
            type="button"
            onClick={() => setMode("practice")}
            className="text-left cursor-pointer bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl hover:bg-white/10 hover:border-purple-500/60 transition group"
          >
            <p className="text-xs text-purple-300 uppercase tracking-[0.18em] mb-2">
              Guided learning
            </p>
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
              Practice Mode
              <span className="text-xs font-normal text-gray-400 border border-white/15 rounded-full px-2 py-0.5">
                Topic-wise
              </span>
            </h2>
            <p className="text-gray-300 text-sm">
              Pick a specific topic and get instant feedback after each
              question to understand your mistakes.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setMode("mock")}
            className="text-left cursor-pointer bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl hover:bg-white/10 hover:border-purple-500/60 transition group"
          >
            <p className="text-xs text-emerald-300 uppercase tracking-[0.18em] mb-2">
              Exam simulation
            </p>
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
              Mock Test Mode
              <span className="text-xs font-normal text-gray-400 border border-white/15 rounded-full px-2 py-0.5">
                Timed
              </span>
            </h2>
            <p className="text-gray-300 text-sm">
              Attempt a timed full-length aptitude test that feels close to
              real placement exams.
            </p>
          </button>
        </div>
      </div>
    );
  }

  // Step 2 — Choose Category (Practice Mode)
  if (mode === "practice" && !category) {
    return (
      <div className="text-white max-w-5xl mx-auto space-y-6">
        <button
          onClick={() => setMode(null)}
          className="inline-flex items-center gap-2 text-sm text-purple-300 hover:text-purple-200 transition"
        >
          <span className="text-lg leading-none">←</span>
          <span>Back to mode selection</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">
              Choose a topic
            </h2>
            <p className="text-sm text-gray-400 mt-1 max-w-md">
              Focus on one section at a time to build strong fundamentals.
            </p>
          </div>

          <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
            Practice mode · Topic‑wise questions
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className="text-left cursor-pointer bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:bg-white/10 hover:border-purple-500/60 transition flex flex-col gap-2"
            >
              <h3 className="text-lg font-semibold capitalize">
                {cat}
              </h3>
              <p className="text-xs text-gray-400">
                Practice {cat} questions with instant feedback.
              </p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // 🔹 Step 3 — Practice Module
  if (mode === "practice" && category) {
    return (
      <div className="text-white max-w-5xl mx-auto space-y-4">
        <button
          onClick={() => setCategory(null)}
          className="inline-flex items-center gap-2 text-sm text-purple-300 hover:text-purple-200 transition"
        >
          <span className="text-lg leading-none">←</span>
          <span>Change topic</span>
        </button>

        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl sm:text-2xl font-semibold capitalize">
            {category} practice
          </h2>
          <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
            Practice mode
          </span>
        </div>

        <PracticeModule category={category} />
      </div>
    );
  }

  // Step 4 — Mock Mode (placeholder)
  if (mode === "mock") {
    return (
      <div className="text-white max-w-5xl mx-auto space-y-4">
        <button
          onClick={() => setMode(null)}
          className="inline-flex items-center gap-2 text-sm text-purple-300 hover:text-purple-200 transition"
        >
          <span className="text-lg leading-none">←</span>
          <span>Back to modes</span>
        </button>

        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl sm:text-2xl font-semibold">
            Aptitude mock test
          </h2>
          <span className="px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/40 text-xs text-red-300">
            Timed test
          </span>
        </div>

        <MockModule />
      </div>
    );
  }

  return null;
}

export default Aptitude;