import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const featuresRef = useRef(null);

  const [heroVisible, setHeroVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [featuresVisible, setFeaturesVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (entry.target === heroRef.current) setHeroVisible(true);
          if (entry.target === statsRef.current) setStatsVisible(true);
          if (entry.target === featuresRef.current) setFeaturesVisible(true);
        });
      },
      { threshold: 0.15 }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    if (statsRef.current) observer.observe(statsRef.current);
    if (featuresRef.current) observer.observe(featuresRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#020617] to-black text-white relative overflow-hidden">

      {/* Background Glow Effects */}
      <div className="absolute w-125 h-125 bg-purple-600/20 rounded-full blur-3xl -top-50 -left-50 animate-pulse" />
      <div className="absolute w-125 h-125 bg-blue-600/20 rounded-full blur-3xl -bottom-50 -right-50 animate-pulse" />

      {/* Navbar */}
      <nav className="relative flex items-center justify-between px-6 md:px-16 py-5 z-10">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-sm font-bold">
            ST
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold">StudyTrack</span>
            <span className="text-[11px] text-gray-400">
              Placement prep, simplified.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 text-sm border border-white/15 rounded-xl hover:border-purple-400 hover:bg-white/5 transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="px-5 py-2 text-sm rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/40 transition"
          >
            Get started
          </button>
        </div>
      </nav>

      <main className="relative z-10 px-6 md:px-16">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="grid gap-10 lg:grid-cols-[1.4fr,1fr] items-center pt-10 md:pt-16"
        >
          {/* Left: text */}
          <div
            className={`space-y-6 transform transition-all duration-700 ease-out ${
              heroVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-200 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Built for placement-focused students
            </p>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Crack your{" "}
              <span className="bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                dream placement
              </span>
              {" "}with structured prep.
            </h2>

            <p className="text-gray-400 max-w-xl text-sm md:text-base">
              Practice aptitude, solve curated coding problems, and learn from
              real interview experiences — all in one focused dashboard.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/signup")}
                className="px-7 py-3 rounded-xl text-sm md:text-base font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 transition"
              >
                Start preparing
              </button>

              <button
                onClick={() => navigate("/login")}
                className="px-7 py-3 rounded-xl border border-white/20 text-sm md:text-base hover:border-purple-400 hover:bg-white/5 transition"
              >
                I already have an account
              </button>
            </div>

            <div className="flex flex-wrap gap-6 text-xs md:text-sm text-gray-400 pt-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                Topic-wise aptitude practice
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                Coding tracker with solved status
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                Real interview experiences
              </div>
            </div>
          </div>

          {/* Right: stats card */}
          <div
            ref={statsRef}
            className={`hidden md:block transform transition-all duration-700 ease-out ${
              statsVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-7 backdrop-blur-xl shadow-[0_0_40px_rgba(15,23,42,0.8)] space-y-6 max-w-md ml-auto">
              <h3 className="text-lg font-semibold mb-1">
                Your prep cockpit
              </h3>
              <p className="text-xs text-gray-400">
                Get a quick snapshot of your progress across aptitude, coding
                and mocks once you log in.
              </p>

              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="rounded-2xl bg-black/40 border border-white/10 p-3">
                  <p className="text-[11px] text-gray-400">Aptitude score</p>
                  <p className="mt-1 text-xl font-semibold text-emerald-300">
                    78%
                  </p>
                  <p className="text-[11px] text-emerald-200/80">
                    Trending up ↑
                  </p>
                </div>
                <div className="rounded-2xl bg-black/40 border border-white/10 p-3">
                  <p className="text-[11px] text-gray-400">Coding solved</p>
                  <p className="mt-1 text-xl font-semibold text-blue-300">
                    45
                  </p>
                  <p className="text-[11px] text-blue-200/80">
                    Target: 100
                  </p>
                </div>
                <div className="rounded-2xl bg-black/40 border border-white/10 p-3">
                  <p className="text-[11px] text-gray-400">Mocks given</p>
                  <p className="mt-1 text-xl font-semibold text-purple-300">
                    3
                  </p>
                  <p className="text-[11px] text-purple-200/80">
                    Next: Sunday
                  </p>
                </div>
              </div>

              <div className="mt-2 space-y-2 text-[11px] text-gray-300">
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Personalized analytics once you sign in.
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  Built to mirror real placement tests.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          ref={featuresRef}
          className={`mt-20 md:mt-24 pb-20 transform transition-all duration-700 ease-out ${
            featuresVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-4">
            Everything you need in one place
          </h3>
          <p className="text-sm md:text-base text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Switch between focused practice and exam-style mocks, while your
            progress is tracked automatically in the dashboard.
          </p>

          <div className="grid gap-6 md:gap-8 md:grid-cols-3">
            <div
              className="bg-white/5 border border-white/10 backdrop-blur-lg p-6 md:p-7 rounded-2xl hover:bg-white/10 hover:border-purple-500/50 transition"
              style={{ transitionDelay: featuresVisible ? "80ms" : "0ms" }}
            >
              <h4 className="text-lg font-semibold mb-3 text-purple-300">
                Aptitude practice
              </h4>
              <p className="text-gray-400 text-sm">
                Topic-wise questions with instant feedback and practice vs mock
                separation so you can revise smarter.
              </p>
            </div>

            <div
              className="bg-white/5 border border-white/10 backdrop-blur-lg p-6 md:p-7 rounded-2xl hover:bg-white/10 hover:border-blue-500/50 transition"
              style={{ transitionDelay: featuresVisible ? "160ms" : "0ms" }}
            >
              <h4 className="text-lg font-semibold mb-3 text-blue-300">
                Coding questions
              </h4>
              <p className="text-gray-400 text-sm">
                Curated questions with solved status tracking, filters by
                platform and difficulty, and a clean practice list.
              </p>
            </div>

            <div
              className="bg-white/5 border border-white/10 backdrop-blur-lg p-6 md:p-7 rounded-2xl hover:bg-white/10 hover:border-pink-500/50 transition"
              style={{ transitionDelay: featuresVisible ? "240ms" : "0ms" }}
            >
              <h4 className="text-lg font-semibold mb-3 text-pink-300">
                Interview experiences
              </h4>
              <p className="text-gray-400 text-sm">
                Read, upvote and share detailed interview experiences so you
                know what to expect in real placement drives.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative text-center py-6 border-t border-white/10 text-gray-500 z-10 text-xs md:text-sm">
        © {new Date().getFullYear()} StudyTrack. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;