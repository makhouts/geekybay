import express from "express";
import pool from "../helper/dbConnection.js";
import { isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.use(isAdmin);

//USERS

// Get all users
router.get("/users", (req, res) => {
  console.log(req.user);
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
router.get("/users/:id", (req, res) => {
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

//Update user
router.put("/users/:id", async (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const data = req.body;
    connection.query("UPDATE users SET ? WHERE userID = ?", [data, req.params.id], (err, rows) => {
      connection.release();
      if (!err) {
        res.status(200).send(rows);
      } else {
        res.status(400).send({ message: "Could not update user" });
      }
    });
  });
});

//Delete user by id
router.delete("/users/:id", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query("DELETE FROM users WHERE userID = ?", [req.params.id], (err, rows) => {
      connection.release();
      if (!err) {
        res.status(204);
      } else {
        res.status(400).send(err);
      }
    });
  });
});

//Products

export default router;
