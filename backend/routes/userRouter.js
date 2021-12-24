import express from "express";
import pool from "../helper/dbConnection.js";
import bcrypt from "bcrypt";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

//Get all users
router.get("/", isAuth, (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query("SELECT * from users", (err, rows) => {
      connection.release();
      if (!err) {
        res.status(200).send(rows);
      } else {
        res.status(400).send("Bad request");
      }
    });
  });
});

//Get user by id
router.get("/:id", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query("SELECT * FROM users WHERE userid = ?", [req.params.id], (err, rows) => {
      connection.release();
      if (!err) {
        res.status(200).send(rows);
      } else {
        res.status(400).send("Bad request");
      }
    });
  });
});

//Create buyer
router.post("/", (req, res) => {
  pool.getConnection(async (err, connection) => {
    if (err) throw err;
    const data = req.body;
    data.type = "buyer";
    connection.query("INSERT INTO users SET ?", data, (err, rows) => {
      connection.release();
      if (!err) {
        res.status(200).send(rows);
      } else {
        console.log(err);
      }
    });
  });
});

//Update user
router.put("/", isAuth, async (req, res) => {
  const data = req.body;
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query("UPDATE users SET ? WHERE userID = ?", [data, req.user.userID], (err, rows) => {
      connection.release();
      if (!err) {
        res.status(200).send(rows);
      } else {
        console.log(err);
      }
    });
  });
});

// Update password
router.put("/update-password", isAuth, (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query("Select * FROM users WHERE userID = ?", [req.user.userID], async(err, rows) => {
      if (!err) {
        if (await bcrypt.compare(req.body.oldPassword, req.user.password)) {
          const hashedPassword = await bcrypt.hash(req.body.newPassword,10);
          connection.query("UPDATE users SET password = ? WHERE userID = ?;", [hashedPassword, req.user.userID], (err, rows) => {
            connection.release();
            if(!err){
              res.status(200).send({message: "pw updated successfully"})
            }else{
              res.status(400).send({message: "could not update user pw"})
            }
          });
        } else {
          res.status(400).send({ message: "incorrect old password" });
        }
      } else {
        res.status(400).send(err);
      }
    });
  });
});

//Delete user
router.delete("/", isAuth, (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query("DELETE FROM users WHERE userID = ?", [req.user.userID], (err, rows) => {
      connection.release();
      if (!err) {
        res.status(200).send(rows);
      } else {
        res.status(400).send(err);
      }
    });
  });
});

export default router;
