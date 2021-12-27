if (process.env.NODE_ENV !== "production") {
  const dotenv = await import("dotenv");
  dotenv.config();
}

import express from "express";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import orderRouter from "./routes/orderRouter.js";

import {ValidationError} from "express-validation";
import authRouter from "./routes/authRouter.js";
import bodyParser from "body-parser";
import session from "express-session";
import pool from "./helper/dbConnection.js";
import passport from "passport";
import mySqlSession from "express-mysql-session";
import multer from 'multer'
import { local } from "./strategies/local.js";
import cors from 'cors'
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
      maxAge: 1000 * 60 * 60 * 1, // 1 hour
      // secure: true TODO: when in prod
    },
  })
);

//TODO: change this for prod
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//validation
app.use(function(err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err)
  }

  return res.status(500).json(err)
});


app.use(passport.initialize());
app.use(passport.session()); // 

//todo: visible to who?
app.use("/users", userRouter);
app.use("/products", productRouter);
//todo: this should not be publicly visible information - only admin?
app.use("/orders", orderRouter);
app.use("/auth", authRouter);

app.listen(process.env.SERVER_PORT);

// TODO: Routes protecting and stuff
// Products
// if admin then get all products else get all products where visible 1
// get products by seller ID -> id should come from req.userid + add isauth (except if admin)
// get product by name -> add 'where visible 1' (except if admin) -> but also what if seller
// same for the image?
// add isAuth to post -> params.sellerID = req.user.userID
// add isauth to update -> add 'and sellerID= req.user.userID' (except admin againnnn)
// delete same as update
// Users
// get all users only for admin?
// get user by id: to edit user info -> different route to show seller info?
// user-info for the edit user info page
// seller info when clicking on the seller of a product
// create buyer is fine i think
// update user isAuth except if ADMIN
// Orders
// get all -> add isAdmin middleware
// get order by id -> ??? there isnt really anything sensitive
// get order by seller id -> isAuth, get id from req.user.userID (except admin -> different route/different request from frontend?)
// get order by buyer id -> same as seller
// add new order -> IDK
// update order -> also not sure
// cencel order -> same



