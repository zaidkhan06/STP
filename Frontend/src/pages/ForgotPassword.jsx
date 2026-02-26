import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/authService";


function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await forgotPassword({ email });
      setMessage("Reset link sent to your email.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden px-4">

      <div className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl top-[-120px] left-[-120px]" />
      <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-3xl bottom-[-120px] right-[-120px]" />

      <div className="relative w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 p-10 rounded-3xl shadow-2xl">

        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Forgot Password
        </h2>

        <p className="text-gray-400 text-center mb-8">
          Enter your email to receive reset link
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="text-gray-400 text-sm">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-xl bg-black/40 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-[1.02] transition duration-300"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

        </form>

        {message && (
          <p className="mt-6 text-center text-purple-400">
            {message}
          </p>
        )}

        <p
          onClick={() => navigate("/login")}
          className="text-gray-500 text-sm text-center mt-8 cursor-pointer hover:underline"
        >
          Back to Login
        </p>

      </div>
    </div>
  );
}

export default ForgotPassword;