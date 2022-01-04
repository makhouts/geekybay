import express from 'express';
//import connection pool
import pool from "../helper/dbConnection.js";
//validation
import {validate} from "express-validation";
import {orderValidation} from "../middleware/validation.js";

import { Email } from '../helper/email.js';

import { isAuth } from '../middleware/auth.js';


const router = express.Router();


//Get orders by sellerId
router.get("/seller",isAuth, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("SELECT * FROM orders WHERE sellerID = ?", [req.user.userID], (err, rows) => {
            connection.release();
            if (!err) {
                res.status(200).send(rows);
            } else {
                res.status(400).send('Bad request for orders by seller ID.')
            }
        });
    });
});

//Get orders by buyerId
router.get("/buyer", isAuth, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("SELECT * FROM orders WHERE buyerID = ?", [ req.user.userID], (err, rows) => {
            connection.release();
            if (!err) {
                res.status(200).send(rows);
            } else {
                res.status(400).send('Bad request for orders by buyer ID.')
            }
        });
    });
});

// TODO: make it secure - get back to it later
//add new order 
router.post("/", validate(orderValidation, {}, {}) ,(req, res) => {
    pool.getConnection((err, connection) => {
        const data = req.body;
        if (err) throw err;
        connection.query("INSERT INTO orders SET ?", data, (err, rows) => {
            if (!err) {
                //get info of both seller and buyer, todo: is buyer's info necessary here?
                connection.query("SELECT * FROM users WHERE userid = ? OR userid = ?", [data.sellerID, data.buyerID], (err, rows) => {
                    connection.release();
                    if (!err) {
                        res.status(200).send(rows);
                        //send mail to seller
                        Email.orderMail(rows[0].emailAddress).catch(console.error);
                        //send mail to buyer
                        Email.orderMail(rows[1].emailAddress).catch(console.error);
                    } else {
                        res.status(400).send("Bad request for seller & buyer data");
                    }
                });

            } else {
                connection.release();
                //?
                res.status(400).send('Bad order post request')
            }

        });
    });
});

//update order
// router.put("/:id",validate(orderValidation, {}, {}), (req, res) => {
//     pool.getConnection((err, connection) => {
//         const data = req.body;
//         if (err) throw err;
//         //params is a request parameter in the url
//         connection.query("UPDATE orders SET ? WHERE orderID=?", [data, req.params.id], (err, rows) => {
//             connection.release();
//             if (!err) {
//                 //the request has succeeded and a new resource has been created as a result.
//                 res.status(201).send(rows);
//             } else {
//                 //?
//                 res.status(400).send('Bad request')
//             }
//         });
//     });
// });

//cancel order: TODO: get back to later
router.put("/cancel/:id", (req, res) => {
    pool.getConnection((err, connection) => {
        const orderStatus = "canceled";
        if (err) throw err;
        //params is a request parameter in the url
        connection.query("UPDATE orders SET orderStatus=? WHERE orderID=?", [orderStatus, req.params.id], (err, rows) => {
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

export default router;