if (process.env.NODE_ENV !== "production") {
  const dotenv = await import("dotenv");
  dotenv.config();
}
import express from "express";
import userRouter from "./routes/userRouter.js";

const app = express();

import bodyParser from 'body-parser'
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/users", userRouter);



app.listen(process.env.SERVER_PORT);
