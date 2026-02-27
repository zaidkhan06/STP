import { useEffect, useState, useRef } from "react";
import {
  getCodingQuestions,
  getSolvedQues,
  toggleSolved,
} from "../../services/codingService";

function Coding() {
  const [questions, setQuestions] = useState([]);
  const [solved, setSolved] = useState([]);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef(null);

  // Fetch solved once
  useEffect(() => {
    fetchSolved();
  }, []);

  // Fetch questions when page changes
  useEffect(() => {
    fetchQuestions();
  }, [page]);

  const fetchSolved = async () => {
    try {
      const solvedQues = await getSolvedQues();
      setSolved(solvedQues || []);
    } catch (error) {
      console.error("Error fetching solved questions");
    }
  };

  const fetchQuestions = async () => {
    if (!hasMore || loading) return;

    try {
      setLoading(true);

      const data = await getCodingQuestions(page, 10);

      const newQuestions = data.questions;

      if (!newQuestions || newQuestions.length === 0) {
        setHasMore(false);
      } else {
        setQuestions((prev) => [...prev, ...newQuestions]);
      }
    } catch (error) {
      console.error("Error fetching questions");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id) => {
    try {
      const data = await toggleSolved(id);
      setSolved(data.solvedCoding);
    } catch (error) {
      console.error("Error toggling solved");
    }
  };

  const isSolved = (id) =>
    solved?.some((q) => q.toString() === id.toString());

  const difficultyColor = (difficulty) => {
    if (difficulty === "easy") return "bg-green-500/20 text-green-400";
    if (difficulty === "medium") return "bg-yellow-500/20 text-yellow-400";
    return "bg-red-500/20 text-red-400";
  };

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !loading &&
          hasMore
        ) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [loading, hasMore]);

  return (
    <div className="text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold">
          Coding Practice
        </h2>

        <div className="text-sm bg-white/5 px-4 py-2 rounded-xl border border-white/10 w-fit">
          Solved: {solved.length}
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">
        <table className="w-full text-left">
          <thead className="bg-black/40 border-b border-white/10">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Difficulty</th>
              <th className="px-6 py-4">Platform</th>
              <th className="px-6 py-4 text-center">Solved</th>
            </tr>
          </thead>

          <tbody>
            {questions.map((q) => (
              <tr
                key={q._id}
                className="border-b border-white/5 hover:bg-purple-600/10 transition"
              >
                <td className="px-6 py-4">
                  <a
                    href={q.link}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-purple-400 transition"
                  >
                    {q.title}
                  </a>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColor(
                      q.difficulty
                    )}`}
                  >
                    {q.difficulty}
                  </span>
                </td>

                <td className="px-6 py-4 capitalize">
                  {q.platform}
                </td>

                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleToggle(q._id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      isSolved(q._id)
                        ? "bg-green-600/20 text-green-400"
                        : "bg-white/10 hover:bg-white/20"
                    }`}
                  >
                    {isSolved(q._id)
                      ? "Solved ✓"
                      : "Mark Solved"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {questions.map((q) => (
          <div
            key={q._id}
            className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-xl shadow-md"
          >
            <div className="flex justify-between items-start mb-3">
              <a
                href={q.link}
                target="_blank"
                rel="noreferrer"
                className="font-semibold hover:text-purple-400 transition"
              >
                {q.title}
              </a>

              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColor(
                  q.difficulty
                )}`}
              >
                {q.difficulty}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400 capitalize">
                {q.platform}
              </span>

              <button
                onClick={() => handleToggle(q._id)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition ${
                  isSolved(q._id)
                    ? "bg-green-600/20 text-green-400"
                    : "bg-purple-600/20 text-purple-400"
                }`}
              >
                {isSolved(q._id)
                  ? "Solved ✓"
                  : "Solve"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Loader */}
      {hasMore && (
        <div
          ref={loaderRef}
          className="text-center py-6 text-purple-400"
        >
          {loading
            ? "Loading more questions..."
            : "Scroll to load more"}
        </div>
      )}
    </div>
  );
}

export default Coding;