import express from "express";
import pool from "../helper/dbConnection.js";
import bcrypt from "bcrypt";
import passport from "passport";
import { isNotAuth } from "../middleware/auth.js";
import { validate } from "express-validation";
import { sellerValidation } from "../middleware/validation.js";

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
  //  passport.auth calls the strategy
  //  If a user is found an validated, a callback is called (`cb(null, user)`) with the user
  //  object.  The user object is then serialized with `passport.serializeUser()` and added to the
  // `req.session.passport` object.
  // NOTE: change cookie age
  res.send("ok");
});

// Register/create a seller
router.post("/register", isNotAuth, validate(sellerValidation, {}, {}), (req, res) => {
  pool.getConnection(async (err, connection) => {
    if (err) throw err;
    const data = req.body;
    data.password = await bcrypt.hash(data.password, 10);
    data.type = "seller";
    connection.query("INSERT INTO users SET ?", data, (err, rows) => {
      connection.release();
      if (!err) {
        res.status(200).send(rows);
      } else {
        res.status(400).send(err)
      }
    });
  });
});

router.delete("/logout", (req, res) => {
  req.session.destroy(); // NOTE: i do want to do this i think?  deletes session from db after logout/ without this session gets updated
  req.logOut();
  res.send("ok");
});

export default router;
