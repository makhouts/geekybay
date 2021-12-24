import express from "express";
import pool from "../helper/dbConnection.js";
import { createResetRequest } from "../helper/resetRequests.js";
import bcrypt from "bcrypt";
import passport from "passport";
import { isNotAuth } from "../middleware/auth.js";
import { v1 as uuidv1 } from "uuid";

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
  // NOTE: change cookie age
  res.status(200).send({message: "Login successful"});
});

// Register/create a seller
router.post("/register", isNotAuth, (req, res) => {
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
        res.status(400).send(err);
      }
    });
  });
});

router.delete("/logout", (req, res) => {
  req.session.destroy(); // NOTE: i do want to do this i think?  deletes session from db after logout/ without this session gets updated
  req.logOut();
  res.send("ok");
});

router.post("/forgot", isNotAuth, (req, res) => {
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
          // sendResetLink(thisUser.email, id); NOTE: once we have mailing
          console.log(`http://localhost:3000/reset/${id}`);
        }
        res.status(200).json();
      } else {
        res.status(400).send(err);
      }
    });
  });
});

// NOTE: nice to have -> expiry date on reset links (add column in db Date.now())
router.patch("/reset", async (req, res) => {
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
                if(!err){
                  res.status(204).send();
                }else{
                  res.status(400).send({message:"error"})
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
        console.log(err);
      }
    });
  });
});

export default router;
