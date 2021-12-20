import express from "express";
import pool from "../helper/dbConnection.js";

const router = express.Router();

//Get all users
router.get("/", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query("SELECT * from users", (err, rows) => {
      connection.release();

      if (!err) {
        res.status(200).send(rows);
      } else {
        res.status(400).send('Bad request')
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
        res.status(400).send('Bad request')
      }
    });
  });
});


//Create user

//Update user

//Delete user

export default router;
