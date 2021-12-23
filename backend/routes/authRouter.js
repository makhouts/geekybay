import express from "express";
import pool from "../helper/dbConnection.js";
import bcrypt from "bcrypt";
import passport from "passport";

const router = express.Router();

router.get("/login", (req, res) => {
  //check if auth already
  // if not return true else false
});

router.get("/register", (req, res) => {
  //check if auth already
  // if not return true else false
});

router.post("/login", passport.authenticate("local"), (req, res) => { //passport.auth calls the strategy
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

router.get("/secret", (req, res) => {
  if (req.user) {
    res.send("ayeeee");
  } else {
    res.send("nah");
  }
});

router.delete("/logout", (req, res) => {
    req.session.destroy();
    req.logOut();
    res.send("ok");
  });

export default router;
