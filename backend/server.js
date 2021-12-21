<<<<<<< HEAD
import express from 'express'
import userRouter from './routes/userRouter.js'
import productRouter from './routes/productRouter.js'

const app = express();

app.use('/users', userRouter)
app.use('/products', productRouter)
=======
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
>>>>>>> 8e9e38a1bf6e7fe878d91479354e35eb5721a5b1



app.listen(process.env.SERVER_PORT);
