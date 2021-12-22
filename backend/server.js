import express from 'express'
import userRouter from './routes/userRouter.js'
import productRouter from './routes/productRouter.js'
import bodyParser from 'body-parser'
import multer from 'multer'

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use(multer)

if (process.env.NODE_ENV !== "production") {
  const dotenv = await import("dotenv");
  dotenv.config();
}

app.listen(process.env.SERVER_PORT);
