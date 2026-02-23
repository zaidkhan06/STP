import { useState } from "react";
import PracticeModule from "./PracticeModule";
import MockModule from "./MockModule";
// import MockModule from "./MockModule"; // later

function Aptitude() {
  const [mode, setMode] = useState(null);
  const [category, setCategory] = useState(null);

  const topics = ["quantitative", "logical", "verbal"];

  // 🔹 Step 1 — Choose Mode
  if (!mode) {
    return (
      <div className="grid md:grid-cols-2 gap-8 text-white">

        <div
          onClick={() => setMode("practice")}
          className="cursor-pointer bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-xl hover:scale-105 transition"
        >
          <h2 className="text-2xl font-bold mb-4">
            Practice Mode
          </h2>
          <p className="text-gray-400">
            Topic-wise learning with instant feedback.
          </p>
        </div>

        <div
          onClick={() => setMode("mock")}
          className="cursor-pointer bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-xl hover:scale-105 transition"
        >
          <h2 className="text-2xl font-bold mb-4">
            Mock Test Mode
          </h2>
          <p className="text-gray-400">
            Timed full-length aptitude simulation.
          </p>
        </div>

      </div>
    );
  }

  // 🔹 Step 2 — Choose Category (Practice Mode)
  if (mode === "practice" && !category) {
    return (
      <div className="text-white">

        <button
          onClick={() => setMode(null)}
          className="mb-6 text-purple-400 hover:underline"
        >
          ← Back
        </button>

        <h2 className="text-2xl font-bold mb-8">
          Select Topic
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {topics.map((cat) => (
            <div
              key={cat}
              onClick={() => setCategory(cat)}
              className="cursor-pointer bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:scale-105 transition"
            >
              <h3 className="text-xl font-semibold capitalize">
                {cat}
              </h3>
              <p className="text-gray-400 mt-2">
                Practice {cat} questions
              </p>
            </div>
          ))}
        </div>

      </div>
    );
  }

  // 🔹 Step 3 — Practice Module
  if (mode === "practice" && category) {
    return (
      <div className="text-white">

        <button
          onClick={() => setCategory(null)}
          className="mb-6 text-purple-400 hover:underline"
        >
          ← Change Topic
        </button>

        <PracticeModule category={category} />

      </div>
    );
  }

  // 🔹 Step 4 — Mock Mode (placeholder)
  if (mode === "mock") {
    return (
      <div className="text-white">
        <button
          onClick={() => setMode(null)}
          className="mb-6 text-purple-400 hover:underline"
        >
          ← Back
        </button>
        <MockModule />
      </div>
    );
  }

  return null;
}

export default Aptitude;