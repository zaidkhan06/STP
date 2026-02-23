import rateLimit from "express-rate-limit";

const verificationLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 3,
  message: "Too many requests. Try later."
});

export default verificationLimiter;