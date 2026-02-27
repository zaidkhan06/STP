import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";


function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const data = await registerUser(formData);
      setMessage(data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#050816] via-[#020617] to-black relative overflow-hidden px-4">
      {/* Background Glow */}
      <div className="absolute w-80 h-80 bg-purple-600/20 rounded-full blur-3xl top-[-120px] left-[-80px]" />
      <div className="absolute w-72 h-72 bg-blue-600/25 rounded-full blur-3xl bottom-[-100px] right-[-60px]" />

      {/* Centered auth card */}
      <div className="relative w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 px-6 sm:px-8 py-8 sm:py-10 rounded-3xl shadow-2xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-2">
          Create your account
        </h2>

        <p className="text-gray-400 text-center mb-8 text-sm">
          Sign up in a minute and start your placement prep.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-gray-400 text-sm">Full name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-3 rounded-xl bg-black/40 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm">Email address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-3 rounded-xl bg-black/40 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-3 rounded-xl bg-black/40 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
              placeholder="Create a strong password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/30 transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        {message && (
          <p className="mt-6 text-green-400 text-center font-medium text-sm">
            {message}
          </p>
        )}

        {error && (
          <p className="mt-6 text-red-400 text-center font-medium text-sm">
            {error}
          </p>
        )}

        <p className="text-gray-500 text-xs sm:text-sm text-center mt-8">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-purple-400 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;