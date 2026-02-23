import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { verifyEmail } from "../services/authService";

function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const hasCalled = useRef(false);

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (hasCalled.current) return;
    hasCalled.current = true;

    const verify = async () => {
      try {
        const data = await verifyEmail(token);
        setMessage(data.message);
        setStatus("success");

        // Auto redirect after 3 sec
        setTimeout(() => {
          navigate("/login");
        }, 3000);

      } catch (err) {
        setMessage(
          err.response?.data?.message || "Verification failed"
        );
        setStatus("error");
      }
    };

    verify();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden px-4">

      {/* Background Glow */}
      <div className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl top-[-120px] left-[-120px]" />
      <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-3xl bottom-[-120px] right-[-120px]" />

      <div className="relative w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 p-10 rounded-3xl shadow-2xl text-center">

        {status === "loading" && (
          <>
            <h2 className="text-2xl font-semibold text-white mb-6">
              Verifying your email...
            </h2>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
            </div>
          </>
        )}

        {status === "success" && (
          <>
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-green-400 mb-4">
              Email Verified Successfully
            </h2>
            <p className="text-gray-300 mb-6">{message}</p>

            <button
              onClick={() => navigate("/login")}
              className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/30 transition duration-300"
            >
              Go to Login
            </button>

            <p className="text-gray-500 text-sm mt-4">
              Redirecting automatically...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="text-5xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-red-400 mb-4">
              Verification Failed
            </h2>
            <p className="text-gray-300 mb-6">{message}</p>

            <button
              onClick={() => navigate("/signup")}
              className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/30 transition duration-300"
            >
              Back to Signup
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default VerifyEmail;