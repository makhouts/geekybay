import express from "express";
import pool from "../helper/dbConnection.js";
import bcrypt from "bcrypt";
import passport from "passport";
import { isNotAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/login", isNotAuth, (req, res) => {
  //check if auth already
  // if not return true else false
  res.status(200).send({ message: "we good" });
});

router.get("/register", (req, res) => {
  //check if auth already
  // if not return true else false //
});

router.post("/login", isNotAuth, passport.authenticate("local"), (req, res) => {
  //passport.auth calls the strategy
  //  If a user is found an validated, a callback is called (`cb(null, user)`) with the user
  //  object.  The user object is then serialized with `passport.serializeUser()` and added to the
  // `req.session.passport` object.
  // NOTE: change cookie age
  res.send("ok");
  //check if auth already
  // if yes return false
  // else compare entered password with db password
  // if matches return true else false
  // this should create session as well
});

router.post("/register", (req, res) => {
  //check if auth already
  // if yes return false
  //save user
});

router.delete("/logout", (req, res) => {
  // req.session.destroy(); // NOTE: i do want to do this i think?  deletes session from db after logout/ without this session gets updated
  req.logOut();
  res.send("ok");
});

export default router;
