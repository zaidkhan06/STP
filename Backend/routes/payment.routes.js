import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";

const router = express.Router();

// 1️⃣ Create Order
router.post("/create-order", async (req, res) => {
  try {
    // Initialize Razorpay INSIDE handler
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ message: "Amount is required" });
    }

    const options = {
      amount: amount * 100, // convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.json(order);

  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({ message: "Order creation failed" });
  }
});

// 2️⃣ Verify Payment
router.post("/verify-payment", (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      return res.json({ success: true });
    }

    return res.status(400).json({ success: false });

  } catch (error) {
    console.error("Verification Error:", error);
    return res.status(500).json({ success: false });
  }
});

export default router;


// 3️⃣ Create Dynamic QR Code
router.post("/create-qr", async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const { amount } = req.body;

    const qr = await razorpay.qrCode.create({
      type: "upi_qr",
      name: "Study Track",
      usage: "single_use", // or "multiple_use"
      fixed_amount: true,
      payment_amount: amount * 100, // paise
      description: "Support Donation",
    });

    res.json(qr);

  } catch (error) {
    console.error("QR Creation Error:", error);
    res.status(500).json({ message: "QR creation failed" });
  }
});