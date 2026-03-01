import React, { useState } from "react";
import axios from "axios";

function Support() {
  const [loading, setLoading] = useState(false);
  const [qrImage, setQrImage] = useState(null);
  const [qrLoading, setQrLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // --------------------------
  // Generate Dynamic QR
  // --------------------------
  const generateQR = async () => {
    try {
      setQrLoading(true);

      const { data } = await axios.post(
        "http://localhost:5000/api/payment/create-qr",
        { amount: 100 }
      );

      console.log("QR Response:", data);

      setQrImage(data.image_url);

    } catch (error) {
      console.error("QR Error:", error.response?.data || error);
      alert("Failed to generate QR");
    } finally {
      setQrLoading(false);
    }
  };

  // --------------------------
  // Razorpay Checkout
  // --------------------------
  const handlePayment = async () => {
    try {
      setLoading(true);

      const { data: order } = await axios.post(
        "http://localhost:5000/api/payment/create-order",
        { amount: 100 }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Study Track",
        description: "Support Donation",
        order_id: order.id,

        handler: async function (response) {
          try {
            await axios.post(
              "http://localhost:5000/api/payment/verify-payment",
              response
            );
            setQrImage(null);
            setShowSuccess(true);
          } catch {
            alert("Payment verification failed");
          }
        },

        theme: {
          color: "#7c3aed",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error(error);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8 bg-gradient-to-br from-[#050816] via-[#060b20] to-[#020617] text-white">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Support Study Track
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-300 max-w-2xl">
              Study Track is a free platform crafted to help students prepare
              for placements. If it’s adding value to your journey, you can
              help keep it growing and ad-free by supporting the project.
            </p>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm text-gray-300">
            <p className="font-medium text-white">Transparent & student-first</p>
            <p>No mandatory fees. Your support is optional but impactful.</p>
          </div>
        </div>

        {/* Main support card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-[0_0_40px_rgba(15,23,42,0.8)]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold">
                One-time support
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Secure payment via Razorpay or direct UPI transfer.
              </p>
            </div>

            {/* Razorpay Button */}
            <button
              onClick={handlePayment}
              disabled={loading}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-500 hover:to-indigo-400 transition font-semibold text-sm shadow-lg shadow-purple-500/30 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Donate ₹100 via Razorpay"}
            </button>
          </div>

          <div className="relative flex items-center justify-center text-xs text-gray-400">
            <span className="px-3 bg-[#050816] z-10">or support via UPI</span>
            <span className="absolute inset-x-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>

          {/* UPI Section */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3 text-center md:text-left">
              <p className="text-gray-300 text-sm font-medium">UPI ID</p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/30 border border-white/10 rounded-xl text-sm font-mono">
                studytrack@paytm
              </div>
              <p className="text-xs text-gray-500">
                You can replace this placeholder with your actual UPI ID.
              </p>
            </div>

            {/* QR BOX — UI SAME, LOGIC ADDED */}
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-white/15 bg-black/20 py-5 px-4">

              <div
                onClick={generateQR}
                className="w-40 h-40 rounded-2xl bg-white/5 flex items-center justify-center text-[11px] text-gray-500 cursor-pointer overflow-hidden border border-white/15 hover:border-purple-400/70 transition"
              >
                {qrLoading ? (
                  "Loading..."
                ) : qrImage ? (
                  <img
                    src={qrImage}
                    alt="QR"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  "QR CODE"
                )}
              </div>

              <p className="text-xs text-gray-400 text-center">
                Tap the QR to generate a fresh payment code and scan it with any
                UPI app to support StudyTrack.
              </p>
            </div>
          </div>

          {/* Note */}
          <div className="pt-4 border-t border-white/10 text-xs text-gray-400 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <span>
              Contributions are voluntary and go directly into improving Study Track.
            </span>
            <span className="text-purple-300">
              Even a small amount makes a difference.
            </span>
          </div>
        </div>

        <div className="text-center text-gray-400 text-xs sm:text-sm">
          Thank you for believing in Study Track. Your support helps us build
          better practice experiences and keep them free for everyone.
        </div>
      </div>

      {/* Payment success modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-[#050816] border border-white/10 rounded-3xl px-6 sm:px-8 py-6 sm:py-8 shadow-2xl max-w-md w-full text-white space-y-4">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg sm:text-xl font-semibold">
                Payment successful
              </h2>
              <button
                onClick={() => setShowSuccess(false)}
                className="text-gray-400 hover:text-gray-200 text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-300">
                Thank you so much for supporting <span className="font-semibold">StudyTrack</span>.
              </p>
              <p className="text-xs text-gray-400">
                Your contribution helps us keep the platform free and keep adding
                more practice content for students like you.
              </p>
            </div>

            <div className="mt-3 rounded-2xl bg-gradient-to-r from-purple-600/20 via-blue-600/15 to-emerald-500/15 border border-white/10 px-4 py-3 text-xs text-gray-200">
              <p className="font-medium text-sm mb-1">You&apos;re awesome 🎉</p>
              <p>
                If you have any feedback or feature ideas, feel free to share
                them from inside the app. We read every message.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowSuccess(false)}
                className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-sm transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Support;