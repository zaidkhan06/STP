import { useEffect, useState } from "react";
import axios from "axios";
import CreateExperience from "../components/CreateExprience";

function Interview() {
  const [posts, setPosts] = useState([]);
  const [sort, setSort] = useState("trending");
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    fetchFeed();
  }, [sort]);

  const fetchFeed = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/interview/feed?sort=${sort}`,
      { withCredentials: true }
    );
    console.log(res);
    setPosts(res.data);
  };

  const handleUpvote = async (id) => {
    await axios.post(
      `http://localhost:5000/api/interview/upvote/${id}`,
      {},
      { withCredentials: true }
    );
    fetchFeed();
  };

  return (
    <div className="max-w-3xl mx-auto text-white space-y-8 px-4">

      <CreateExperience onPost={fetchFeed} />

      {/* Sorting Tabs */}
      <div className="flex flex-wrap gap-3">
        {["trending", "new", "top"].map((type) => (
          <button
            key={type}
            onClick={() => setSort(type)}
            className={`px-4 py-2 rounded-xl border text-sm ${
              sort === type
                ? "bg-purple-600/20 border-purple-500"
                : "bg-white/5 border-white/10"
            }`}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Feed */}
      {posts.map((post) => {
        const hours =
          (Date.now() - new Date(post.createdAt)) / 3600000;

        const isExpanded = expanded === post._id;

        return (
          <div
            key={post._id}
            className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row">

              {/* Upvote Column */}
              <div className="flex sm:flex-col items-center justify-center gap-2 px-4 py-3 sm:py-6 bg-white/5 border-b sm:border-b-0 sm:border-r border-white/10 min-w-[70px]">
            

                <span className="font-semibold">
                  {post.upvotes}  
                </span>

                <button
                  onClick={() => handleUpvote(post._id)}
                  className="text-lg hover:text-purple-400 transition cursor-pointer"
                >
                   ▲
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 p-5 space-y-3">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <div>
                    <h3 className="font-semibold text-lg wrap-break-words">
                      {post.company} | {post.role}
                    </h3>

                    <p className="text-gray-400 text-sm">
                      by {post.user?.name} •{" "}
                      {new Date(post.createdAt).toLocaleDateString("en-IN")}
                    </p>
                  </div>

                  <div className="flex gap-2 text-xs">
                    {post.upvotes > 20 && (
                      <span className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full">
                        Trending
                      </span>
                    )}

                    {hours < 12 && (
                      <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full">
                        New
                      </span>
                    )}
                  </div>
                </div>

                {/* Experience */}
                <div
                  className={`text-gray-300 leading-relaxed wrap-break-words whitespace-pre-wrap transition-all duration-300 ${
                    isExpanded ? "max-h-none" : "max-h-32 overflow-hidden"
                  }`}
                >
                  {post.experience}
                </div>

                {/* Read More Button */}
                {post.experience.length > 200 && (
                  <button
                    onClick={() =>
                      setExpanded(isExpanded ? null : post._id)
                    }
                    className="text-sm text-purple-400 hover:underline"
                  >
                    {isExpanded ? "Show Less" : "Read More"}
                  </button>
                )}

                {/* Footer */}
                <div className="flex justify-between items-center pt-3 border-t border-white/10 text-xs text-gray-400">
                  <span>
                    Difficulty: {post.difficulty}
                  </span>

                  <span>
                    {Math.floor(hours)}h ago
                  </span>
                </div>

              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Interview;