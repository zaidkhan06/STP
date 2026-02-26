import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../services/authService";
// import { resetPassword } from "../services/authService";

function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setMessage("Passwords do not match");
    }

    setLoading(true);
    setMessage("");

    try {
      await resetPassword(token, { password: formData.password });
      setMessage("Password updated successfully");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid or expired link");
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
          Reset Password
        </h2>

        <p className="text-gray-400 text-center mb-8">
          Enter your new password
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="text-gray-400 text-sm">New Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-3 rounded-xl bg-black/40 border border-gray-700 text-white focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-3 rounded-xl bg-black/40 border border-gray-700 text-white focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-[1.02] transition duration-300"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>

        </form>

        {message && (
          <p className="mt-6 text-center text-purple-400">
            {message}
          </p>
        )}

      </div>
    </div>
  );
}

export default ResetPassword;