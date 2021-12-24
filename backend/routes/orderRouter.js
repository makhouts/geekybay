import express from 'express';
//import connection pool
import pool from "../helper/dbConnection.js";
//validation
import {validate} from "express-validation";
import {orderValidation} from "../middleware/validation.js";
import { email } from '../helper/email.js';

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

//Get orders by sellerId
router.get("/seller/:id", (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("SELECT * FROM orders WHERE sellerID = ?", [req.params.id], (err, rows) => {
            connection.release();
            if (!err) {
                res.status(200).send(rows);
            } else {
                res.status(400).send('Bad request for orders by seller ID.')
            }
        });
    });
});

//Get orders by sellerId
router.get("/buyer/:id", (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("SELECT * FROM orders WHERE buyerID = ?", [req.params.id], (err, rows) => {
            connection.release();
            if (!err) {
                res.status(200).send(rows);
            } else {
                res.status(400).send('Bad request for orders by buyer ID.')
            }
        });
    });
});

//add new order
router.post("/", validate(orderValidation, {}, {}) ,(req, res) => {
    pool.getConnection((err, connection) => {
        const action = ['orderSeller', 'orderBuyer'];
        const data = req.body;
        if (err) throw err;
        connection.query("INSERT INTO orders SET ?", data, (err, rows) => {
            connection.release();
            if (!err) {
                //the request has succeeded and a new resource has been created as a result.
                res.status(201).send(rows);
                //todo: get email for both seller and buyer, send mail to each

            } else {
                //?
                res.status(400).send('Bad request')
            }
        });
    });
});

//update order
router.put("/:id",validate(orderValidation, {}, {}), (req, res) => {
    pool.getConnection((err, connection) => {
        const data = req.body;
        if (err) throw err;
        //params is a request parameter in the url
        connection.query("UPDATE orders SET ? WHERE orderID=?", [data, req.params.id], (err, rows) => {
            connection.release();
            if (!err) {
                //the request has succeeded and a new resource has been created as a result.
                res.status(201).send(rows);
            } else {
                //?
                res.status(400).send('Bad request')
            }
        });
    });
});

//cancel order:
router.put("/cancel/:id", (req, res) => {
    pool.getConnection((err, connection) => {
        const orderStatus = "canceled";
        if (err) throw err;
        //params is a request parameter in the url
        connection.query("UPDATE orders SET status=? WHERE orderID=?", [orderStatus, req.params.id], (err, rows) => {
            connection.release();
            if (!err) {
                //the request has succeeded and a new resource has been created as a result.
                res.status(201).send(rows);
            } else {
                //?
                res.status(400).send('Bad request')
            }
        });
    });
});

export default router