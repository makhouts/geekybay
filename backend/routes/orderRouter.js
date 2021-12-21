import express from 'express';
//import connection pool
import pool from "../helper/dbConnection.js";

const router = express.Router();

//Get all orders
router.get('/', (req,res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("SELECT * from orders", (err, rows) => {
            //get connection from the pool and release it back
            connection.release();

            if (!err) {
                //request has been processed successfully on the server
                res.status(200).send(rows);
            } else {
                //The request could not be understood by the server due to incorrect syntax. The client SHOULD NOT repeat the request without modifications.
                res.status(400).send('Bad request');
            }
        });
    });
});

//Get order by id
router.get("/:id", (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("SELECT * FROM orders WHERE orderid = ?", [req.params.id], (err, rows) => {
            connection.release();
            if (!err) {
                res.status(200).send(rows);
            } else {
                res.status(400).send('Bad request')
            }
        });
    });
});

//add new order
router.post("/", (req, res) => {
    pool.getConnection((err, connection) => {
        const params = req.body;
        if (err) throw err;
        connection.query("INSERT INTO orders SET ?", params, (err, rows) => {
            connection.release();
            if (!err) {
                res.status(200).send(rows);
            } else {
                res.status(400).send('Bad request')
            }
        });
    });
});



export default router