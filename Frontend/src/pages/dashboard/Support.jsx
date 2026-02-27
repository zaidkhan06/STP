import React from "react";

function Support() {
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
              help keep it growing and ad‑free by supporting the project.
            </p>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm text-gray-300">
            <p className="font-medium text-white">Transparent & student‑first</p>
            <p>No mandatory fees. Your support is optional but impactful.</p>
          </div>
        </div>

        {/* Main support card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-[0_0_40px_rgba(15,23,42,0.8)]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold">
                One‑time support
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Secure payment via Razorpay or direct UPI transfer.
              </p>
            </div>

            {/* Razorpay Button Placeholder */}
            <button className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-500 hover:to-indigo-400 transition font-semibold text-sm shadow-lg shadow-purple-500/30">
              Donate via Razorpay
            </button>
          </div>

          <div className="relative flex items-center justify-center text-xs text-gray-400">
            <span className="px-3 bg-[#050816] z-10">or support via UPI</span>
            <span className="absolute inset-x-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>

          {/* UPI / QR section */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3 text-center md:text-left">
              <p className="text-gray-300 text-sm font-medium">
                UPI ID
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/30 border border-white/10 rounded-xl text-sm font-mono">
                yourupi@bank
              </div>
              <p className="text-xs text-gray-500">
                You can replace this placeholder with your actual UPI ID.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/15 bg-black/20 py-4 px-3">
              <div className="w-24 h-24 rounded-xl bg-white/5 flex items-center justify-center text-[10px] text-gray-500">
                QR CODE
              </div>
              <p className="text-xs text-gray-400 text-center">
                Add your UPI QR code image here to make it even easier for
                students to scan and support.
              </p>
            </div>
          </div>

          {/* Small note */}
          <div className="pt-4 border-t border-white/10 text-xs text-gray-400 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <span>
              Contributions are voluntary and go directly into improving Study Track.
            </span>
            <span className="text-purple-300">
              Even a small amount makes a difference.
            </span>
          </div>
        </div>

        {/* Thank you note */}
        <div className="text-center text-gray-400 text-xs sm:text-sm">
          Thank you for believing in Study Track. Your support helps us build
          better practice experiences and keep them free for everyone.
        </div>
      </div>
    </div>
  );
}

export default Support;