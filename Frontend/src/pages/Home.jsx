import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* Background Glow Effects */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl top-[-200px] left-[-200px]" />
      <div className="absolute w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl bottom-[-200px] right-[-200px]" />

      {/* Navbar */}
      <nav className="relative flex justify-between items-center px-6 md:px-16 py-6 z-10">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          StudyTrack
        </h1>

        <div className="space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 text-sm border border-gray-600 rounded-lg hover:border-purple-400 transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="px-5 py-2 text-sm rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-105 transition"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 md:px-20 mt-24 z-10">
        <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Crack Your{" "}
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Dream Placement
          </span>{" "}
          
        </h2>

        <p className="text-gray-400 max-w-2xl mb-10 text-lg">
          Practice aptitude, solve coding problems, and learn from real
          interview experiences — all in one powerful platform.
        </p>

        <div className="flex gap-6 flex-wrap justify-center">
          <button
            onClick={() => navigate("/signup")}
            className="px-8 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 transition"
          >
            Start Preparing
          </button>

          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 rounded-xl border border-gray-600 hover:border-purple-400 transition"
          >
            Login
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative mt-32 px-6 md:px-20 pb-20 z-10">
        <h3 className="text-3xl font-bold text-center mb-16">
          Everything You Need
        </h3>

        <div className="grid md:grid-cols-3 gap-10">

          <div className="bg-white/5 border border-white/10 backdrop-blur-lg p-8 rounded-2xl hover:scale-105 transition">
            <h4 className="text-xl font-semibold mb-4 text-purple-400">
              Aptitude Practice
            </h4>
            <p className="text-gray-400">
              Take timed tests and track your performance to improve
              consistently.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-lg p-8 rounded-2xl hover:scale-105 transition">
            <h4 className="text-xl font-semibold mb-4 text-blue-400">
              Coding Questions
            </h4>
            <p className="text-gray-400">
              Track solved problems and build strong DSA foundation for
              placements.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-lg p-8 rounded-2xl hover:scale-105 transition">
            <h4 className="text-xl font-semibold mb-4 text-pink-400">
              Interview Experiences
            </h4>
            <p className="text-gray-400">
              Learn from real students who cracked placements and upvote
              helpful experiences.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="relative text-center py-8 border-t border-white/10 text-gray-500 z-10">
        © {new Date().getFullYear()} StudyTrack. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;