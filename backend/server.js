if (process.env.NODE_ENV !== "production") {
  const dotenv = await import("dotenv");
  dotenv.config();
}

import express from "express";
import userRouter from "./routes/userRouter.js";
import productRouter from './routes/productRouter.js';
import orderRouter from "./routes/orderRouter.js";
import bodyParser from 'body-parser'

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//todo: visible to who?
app.use("/users", userRouter);
app.use("/products", productRouter);
//todo: this should not be publicly visible information - only admin?
app.use("/orders", orderRouter);


app.listen(process.env.SERVER_PORT);
