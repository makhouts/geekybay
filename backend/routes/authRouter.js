import express from "express";
import pool from "../helper/dbConnection.js";
import { createResetRequest } from "../helper/resetRequests.js";
import bcrypt from "bcrypt";
import passport from "passport";
import { isNotAuth, isAuth } from "../middleware/auth.js";
import { v1 as uuidv1 } from "uuid";
import { validate } from "express-validation";
import { sellerValidation } from "../middleware/validation.js";
import { Email } from "../helper/email.js";
import { createAccountLimiter, changePasswordLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.get("/login", isNotAuth, (req, res) => {
  res.status(200).send({ message: "User is not authenticated." });
});

router.get("/register", isNotAuth, (req, res) => {
  res.status(200).send({ message: "User is not authenticated." });
});

router.get("/isLoggedIn", (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).send({ loggedIn: true });
  }
  return res.status(200).send({ loggedIn: false });
});

router.post("/login", isNotAuth, passport.authenticate("local"), (req, res) => {
  res.status(200).send({ userId: req.user.userID, username: req.user.userName });
});

// Register/create a seller
router.post("/register", createAccountLimiter, isNotAuth, validate(sellerValidation, {}, {}), (req, res) => {
  pool.getConnection(async (err, connection) => {
    if (err) throw err;

    const data = req.body;
    data.password = await bcrypt.hash(data.password, 10);
    // TODO: delete these dummy values -> have to change db configuration to allow NULL for these fields
    data.type = "seller";
    data.userLastName = "test";
    data.userFirstName = "test";
    data.phone = 123123212;
    data.addressLine1 = "test";
    data.addressLine2 = "test";
    data.city = "test";
    data.postalCode = 4444;
    data.country = "test";

    connection.query("INSERT INTO users SET ?", data, (err, rows) => {
      connection.release();
      if (!err) {
        res.status(200).send(rows);
        //send email if registration successful
        Email.registrationMail(data.emailAddress, data.userName).catch(console.error);
      } else {
        res.status(400).send(err);
      }
    });
  });
});

router.delete("/logout", isAuth, (req, res) => {
  req.session.destroy(); // NOTE: i do want to do this i think?  deletes session from db after logout/ without this session gets updated
  req.logOut();
  res.status(200).send({ message: "Successfully logged out" });
});

router.post("/forgot", changePasswordLimiter, isNotAuth, (req, res) => {
  pool.getConnection(async (err, connection) => {
    if (err) throw err;
    connection.query("SELECT * FROM users WHERE userName = ?", [req.body.username], (err, user) => {
      // NOTE: username or email?
      connection.release();
      if (!err) {
        const thisUser = user[0];
        if (thisUser) {
          const id = uuidv1();
          createResetRequest(id, thisUser.userName, thisUser.emailAddress);
          Email.sendResetMail(thisUser.email, `http://localhost:3000/reset/${id}`);
        }
        res.status(200).json();
      } else {
        res.status(400).send(err);
      }
    });
  });
});

// NOTE: nice to have -> expiry date on reset links (add column in db Date.now())
router.patch("/reset", changePasswordLimiter, async (req, res) => {
  pool.getConnection(async (err, connection) => {
    if (err) throw err;
    connection.query("SELECT * FROM requests WHERE requestId = ?", [req.body.id], async (err, request) => {
      if (!err) {
        const thisRequest = request[0];
        if (thisRequest) {
          if (err) throw err;
          const hashedPassword = await bcrypt.hash(req.body.password, 10);
          connection.query("UPDATE users SET password = ? WHERE userName = ?;", [hashedPassword, thisRequest.username], (err, success) => {
            if (!err) {
              connection.query("DELETE FROM requests WHERE requestId = ?;", [req.body.id], (err, user) => {
                connection.release();
                if (!err) {
                  res.status(204).send();
                } else {
                  res.status(400).send({ message: "error" });
                }
              });
            } else {
              throw err;
            }
          });
        } else {
          res.status(404).json();
        }
      } else {
        throw err;
      }
    });
  });
});

export default router;
