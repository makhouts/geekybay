import express from "express";
import pool from "../helper/dbConnection.js";
import bcrypt from "bcrypt";
import { isAuth } from "../middleware/auth.js";
import {validate} from "express-validation";
import {orderValidation, userValidation} from "../middleware/validation.js";

const router = express.Router();

//Get all users
router.get("/", isAuth, (req, res) => {

  console.log(req.query)

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



//Create user
//router.post("/", validate(userValidation, {}, {}) , (req, res) => {

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

// NOTE: how do we want to update the password - create separate reset-password route
//Update user
router.put("/", isAuth, async (req, res) => {
  const data = req.body;
  data.password = await bcrypt.hash(data.password, 10); // what if not password?
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
