import rateLimit from "express-rate-limit";

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1); TODO: might have to do this

export const mainLimiter = rateLimit({
  windowMs: 1000 * 60 * 15, // 10 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000 * 1, // 1 hour
  max: 5, 
  message: "Too many accounts created from this IP, please try again after an hour",
  standardHeaders: true, 
  legacyHeaders: false
});

export const changePasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000 * 24, // 1 day
  max: 5, 
  message: "Too many password reset requests from this IP, please try again the next day",
  standardHeaders: true, 
  legacyHeaders: false
});



