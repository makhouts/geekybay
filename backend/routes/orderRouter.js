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
                res.status(400).send('Bad request');
            }
        })
    })
})

export default router