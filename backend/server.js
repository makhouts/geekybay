if (process.env.NODE_ENV !== "production") {
  const dotenv = await import("dotenv");
  dotenv.config();
}

import express from "express";
import userRouter from "./routes/userRouter.js";
import productRouter from './routes/productRouter.js';
import orderRouter from "./routes/orderRouter.js";
import bodyParser from 'body-parser';
//?
import {validate, ValidationError, Joi} from "express-validation";

const app = express();
//const { validate, ValidationError, Joi} = require('express-validation');
const orderValidation = {
  body:Joi.object({
    productID: Joi.number()
        .required(),
    orderDate: Joi.date()
        .required(),
    orderStatus: Joi.string()
        .regex(/[a-zA-Z0-9]{3,30}/)
        .required(),
    sellerID: Joi.number()
        .required(),
    buyerID: Joi.number()
        .required(),
  })
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/orders', validate(orderValidation, {}, {}), (req, res) => {
  res.json(200)
})

app.use(function(err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err)
  }

  return res.status(500).json(err)
})

//todo: visible to who?
app.use("/users", userRouter);
app.use("/products", productRouter);
//todo: this should not be publicly visible information - only admin?
app.use("/orders", orderRouter);


app.listen(process.env.SERVER_PORT);
