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
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl -top-25 -left-25" />
      <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -bottom-25 -right-25" />

      <div className="relative w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 p-10 rounded-3xl shadow-2xl">

        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Create Account
        </h2>

        <p className="text-gray-400 text-center mb-8">
          Start your placement journey
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="text-gray-400 text-sm">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-3 rounded-xl bg-black/40 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
            />
          </div>

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
            className="w-full py-3 rounded-xl font-semibold text-white bg-linear-to-r from-purple-600 to-blue-600 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/30 transition duration-300"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

        </form>

        {message && (
          <p className="mt-6 text-green-400 text-center font-medium">
            {message}
          </p>
        )}

        {error && (
          <p className="mt-6 text-red-400 text-center font-medium">
            {error}
          </p>
        )}

        <p className="text-gray-500 text-sm text-center mt-8">
          Already have an account?{" "}
          <span onClick={()=>navigate("/login")} className="text-purple-400 hover:underline cursor-pointer">
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default Signup;