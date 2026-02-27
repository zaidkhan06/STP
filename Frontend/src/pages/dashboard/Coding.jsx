import { useEffect, useState, useRef } from "react";
import {
  getCodingQuestions,
  getSolvedQues,
  toggleSolved,
} from "../../services/codingService";

function Coding() {
  const PAGE_SIZE = 10;
  const [questions, setQuestions] = useState([]);
  const [solved, setSolved] = useState([]);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("all");
  const [platform, setPlatform] = useState("all");

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

      const data = await getCodingQuestions(page, PAGE_SIZE);

      const newQuestions = data?.questions || [];

      if (!newQuestions || newQuestions.length === 0) {
        setHasMore(false);
      } else {
        setQuestions((prev) => {
          const seen = new Set(prev.map((q) => String(q?._id)));
          const merged = [...prev];
          for (const q of newQuestions) {
            const id = String(q?._id);
            if (!seen.has(id)) {
              seen.add(id);
              merged.push(q);
            }
          }
          return merged;
        });
        if (newQuestions.length < PAGE_SIZE) setHasMore(false);
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

  const allPlatforms = Array.from(
    new Set((questions || []).map((q) => q?.platform).filter(Boolean))
  ).sort((a, b) => String(a).localeCompare(String(b)));

  const filteredQuestions = (questions || []).filter((q) => {
    const matchesSearch =
      !search.trim() ||
      String(q?.title || "")
        .toLowerCase()
        .includes(search.trim().toLowerCase());
    const matchesDifficulty =
      difficulty === "all" || q?.difficulty === difficulty;
    const matchesPlatform = platform === "all" || q?.platform === platform;
    return matchesSearch && matchesDifficulty && matchesPlatform;
  });

  // Intersection Observer
  useEffect(() => {
    const target = loaderRef.current;
    if (!target) return;

    const rootEl = target.closest("main");
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
      { root: rootEl || null, threshold: 0, rootMargin: "300px" }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [loading, hasMore]);

  // Fallback: if content doesn't overflow, auto-load next page
  useEffect(() => {
    if (!hasMore || loading) return;
    const el = loaderRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top <= window.innerHeight + 300) {
      setPage((prev) => prev + 1);
    }
  }, [questions.length, hasMore, loading]);

  return (
    <div className="text-white max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Coding Practice
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Browse questions, open on the platform, and track what you’ve solved.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
          <span className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
            Solved: <span className="font-semibold">{solved.length}</span>
          </span>
          <span className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
            Loaded:{" "}
            <span className="font-semibold">{questions.length}</span>
          </span>
          <span className="bg-purple-600/15 border border-purple-500/30 text-purple-200 px-3 py-1.5 rounded-full">
            Showing:{" "}
            <span className="font-semibold">{filteredQuestions.length}</span>
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur-xl">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <label className="text-xs text-gray-400">Search by title</label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="e.g. Two Sum, Binary Search..."
              className="mt-1 w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:w-[520px]">
            <div>
              <label className="text-xs text-gray-400">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="mt-1 w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-purple-500"
              >
                <option className="bg-black" value="all">
                  All
                </option>
                <option className="bg-black" value="easy">
                  Easy
                </option>
                <option className="bg-black" value="medium">
                  Medium
                </option>
                <option className="bg-black" value="hard">
                  Hard
                </option>
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-400">Platform</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="mt-1 w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-purple-500"
              >
                <option className="bg-black" value="all">
                  All
                </option>
                {allPlatforms.map((p) => (
                  <option key={p} className="bg-black" value={p}>
                    {String(p)}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setDifficulty("all");
                setPlatform("all");
              }}
              className="mt-5 sm:mt-0 sm:self-end col-span-2 sm:col-span-1 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition text-sm"
            >
              Reset
            </button>
          </div>
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
            {filteredQuestions.map((q) => (
              <tr
                key={q._id}
                className="border-b border-white/5 hover:bg-purple-600/10 transition"
              >
                <td className="px-6 py-4">
                  <a
                    href={q.link}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-purple-300 transition font-medium"
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
        {filteredQuestions.map((q) => (
          <div
            key={q._id}
            className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-xl shadow-md"
          >
            <div className="flex justify-between items-start gap-3 mb-3">
              <a
                href={q.link}
                target="_blank"
                rel="noreferrer"
                className="font-semibold hover:text-purple-300 transition text-sm leading-snug"
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

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 capitalize">
                Platform: <span className="text-gray-300">{q.platform}</span>
              </span>
              <span className="text-xs text-gray-500">
                {isSolved(q._id) ? "Done" : "Pending"}
              </span>
            </div>

            <div className="mt-4 flex gap-3">
              <a
                href={q.link}
                target="_blank"
                rel="noreferrer"
                className="flex-1 text-center px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition text-sm"
              >
                Open
              </a>
              <button
                onClick={() => handleToggle(q._id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                  isSolved(q._id)
                    ? "bg-green-600/20 text-green-400"
                    : "bg-purple-600/25 text-purple-200 hover:bg-purple-600/35"
                }`}
              >
                {isSolved(q._id) ? "Solved ✓" : "Mark Solved"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {!filteredQuestions.length && (
        <div className="mt-10 bg-white/5 border border-white/10 rounded-3xl p-8 text-center text-white">
          <p className="text-lg font-semibold">No questions found</p>
          <p className="text-sm text-gray-400 mt-1">
            Try clearing filters or searching with a different keyword.
          </p>
        </div>
      )}

      {/* Loader */}
      {hasMore && (
        <div
          ref={loaderRef}
          className="text-center py-8 text-purple-300"
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