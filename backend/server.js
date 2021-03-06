if (process.env.NODE_ENV !== "production") {
  const dotenv = await import("dotenv");
  dotenv.config();
}

import express from "express";
import { ValidationError } from "express-validation";
import passport from "passport";
import mySqlSession from "express-mysql-session";
import session from "express-session";
import bodyParser from "body-parser";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import orderRouter from "./routes/orderRouter.js";
import orderDetailRouter from "./routes/orderDetailRouter.js";
import adminRouter from "./routes/adminRouter.js";
import authRouter from "./routes/authRouter.js";
import paymentRouter from "./routes/paymentRouter.js";
import pool from "./helper/dbConnection.js";
import { local } from "./strategies/local.js";
import { mainLimiter } from "./middleware/rateLimiter.js";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const mySQLStore = mySqlSession(session);
const store = new mySQLStore({}, pool);

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// Apply the rate limiting middleware to all requests
app.use(express.static(path.resolve(__dirname, "../frontend/build")));

app.use(mainLimiter);
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length,Accept, X-Requested-With");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//validation
app.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }
  return res.status(500).json(err);
});

app.use(passport.initialize());
app.use(passport.session()); //

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/orderdetails", orderDetailRouter);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/pay", paymentRouter);

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});

app.listen(process.env.PORT);
