import express from "express";
import pool from "../helper/dbConnection.js";
import bcrypt from 'bcrypt'

const router = express.Router();

//Get all users
router.get("/", (req, res) => {
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
router.post("/", (req, res) => {
  pool.getConnection(async (err, connection) => {
    if (err) throw err;
    const data = req.body;
    data.password = await bcrypt.hash(data.password, 10) 
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

// NOTE: how do we want to update the password
//Update user
router.put("/:id", async(req, res) => {
  const data = req.body;
  data.password = await bcrypt.hash(data.password, 10)
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query("UPDATE users SET ? WHERE userID = ?", [data, req.params.id], (err, rows) => {
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
router.delete("/:id", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query("DELETE FROM users WHERE userID = ?", [req.params.id], (err, rows) => {
      connection.release(); 
      if (!err) {
        res.status(200).send(rows);
      } else {
        console.log(err);
      }
    });
  });
});

export default router;
