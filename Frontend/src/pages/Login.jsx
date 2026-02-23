import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

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
    setLoading(true);

    try {
      const data = await loginUser(formData);

      navigate("/dashboard"); // redirect after login

    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden px-4">

      {/* Background Glow */}
      <div className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl top-[-120px] left-[-120px]" />
      <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-3xl bottom-[-120px] right-[-120px]" />

      <div className="relative w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 p-10 rounded-3xl shadow-2xl">

        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Welcome Back
        </h2>

        <p className="text-gray-400 text-center mb-8">
          Continue your placement journey
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="text-gray-400 text-sm">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-3 rounded-xl bg-black/40 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
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
              className="mt-1 w-full px-4 py-3 rounded-xl bg-black/40 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/30 transition duration-300"
          >
            {loading ? "Signing In..." : "Login"}
          </button>

        </form>

        {error && (
          <p className="mt-6 text-red-400 text-center font-medium">
            {error}
          </p>
        )}

        <p className="text-gray-500 text-sm text-center mt-8">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-purple-400 hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;