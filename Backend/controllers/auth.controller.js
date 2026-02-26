import User from "../models/user.model.js";
import crypto from "crypto";
import generateToken from "../utils/generateToken.js";
import sendEmail from "../utils/sendEmail.js";


// ================= REGISTER =================
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password });

    // Create verification token
    const rawToken = user.createEmailVerificationToken();
    await user.save({ validateBeforeSave: false });

    const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${rawToken}`;

    try {
      await sendEmail({
        to: user.email,
        subject: "Verify Your Email - Study Track",
        html: `
          <h3>Email Verification</h3>
          <p>Click the link below to verify your account:</p>
          <a href="${verificationUrl}">${verificationUrl}</a>
          <p>This link will expire in 24 hours.</p>
        `
      });
    } catch (emailError) {
      console.log("EMAIL ERROR:", emailError);
      // Rollback token if email fails
      user.emailVerificationToken = undefined;
      user.emailVerificationExpire = undefined;
      await user.save({ validateBeforeSave: false });

      return res.status(500).json({
        message: "Email could not be sent. Please try again."
      });
    }

    res.status(201).json({
      message: "Registration successful. Please verify your email."
    });

  } catch (error) {
    console.log("REGISTER ERROR:", error);
    res.status(500).json({ message: `Server error${error}` });
  }
};



// ================= VERIFY EMAIL =================
export const verifyEmail = async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired verification link"
      });
    }

    user.emailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpire = undefined;

    await user.save();

    res.json({ message: "Email verified successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



// ================= RESEND VERIFICATION =================
export const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.emailVerified) {
      return res.status(400).json({ message: "Account already verified" });
    }

    const rawToken = user.createEmailVerificationToken();
    await user.save({ validateBeforeSave: false });

    const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${rawToken}`;

    try {
      await sendEmail({
        to: user.email,
        subject: "Resend Verification - Study Track",
        html: `
          <h3>Email Verification</h3>
          <p>Click below to verify your account:</p>
          <a href="${verificationUrl}">${verificationUrl}</a>
          <p>This link expires in 24 hours.</p>
        `
      });
    } catch (emailError) {
      user.emailVerificationToken = undefined;
      user.emailVerificationExpire = undefined;
      await user.save({ validateBeforeSave: false });

      return res.status(500).json({
        message: "Email could not be sent. Try again later."
      });
    }

    res.json({ message: "Verification email resent successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



// ================= LOGIN =================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!user.emailVerified) {
      return res.status(401).json({
        message: "Account not verified. Please verify your email."
      });
    }
    const token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // true in production (https)
      sameSite: "none", //none in production & and lax in local
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      message: "Login successful"
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export const checkAuth = (req, res) => {
  res.json({ message: "Authenticated" });
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false, // true in production (https)
      sameSite: "lax"
    });

    return res.status(200).json({
      message: "Logged out successfully"
    });

  } catch (error) {
    return res.status(500).json({
      message: "Logout failed"
    });
  }
};