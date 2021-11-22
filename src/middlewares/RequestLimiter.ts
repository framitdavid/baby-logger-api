import rateLimit from "express-rate-limit";

const FIFTEEN_MINUTES = 15 * 60 * 100;
const MAX_REQUESTS_WITHIN_WINDOW_MS = 100;

export const apiRequestLimiter = rateLimit({
  windowMs: FIFTEEN_MINUTES,
  max: MAX_REQUESTS_WITHIN_WINDOW_MS,
});
