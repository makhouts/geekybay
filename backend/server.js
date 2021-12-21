import express from 'express'
import userRouter from './routes/userRouter.js'
import productRouter from './routes/productRouter.js'
import bodyParser from 'body-parser'

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', userRouter)
app.use('/products', productRouter)

if (process.env.NODE_ENV !== "production") {
  const dotenv = await import("dotenv");
  dotenv.config();
}

app.listen(process.env.SERVER_PORT);
