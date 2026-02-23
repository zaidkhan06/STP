import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true,
      minlength: 6
    },

    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student"
    },

    solvedCoding: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CodingQuestion"
      }
    ],

    aptitudeAttempts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AptitudeAttempt"
      }
    ],

    emailVerified: {
      type: Boolean,
      default: false
    },

    emailVerificationToken: String,
    emailVerificationExpire: Date
  },
  {
    timestamps: true
  }
);

//
// Password Hash Middleware
//
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

//
// Password Compare Method
//
userSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

//
// Email Verification Token Generator
//
userSchema.methods.createEmailVerificationToken = function () {
  const rawToken = crypto.randomBytes(32).toString("hex");

  this.emailVerificationToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");

  this.emailVerificationExpire = Date.now() + 24 * 60 * 60 * 1000;

  return rawToken;
};

export default mongoose.model("User", userSchema);