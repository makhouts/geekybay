import express from 'express';
//import connection pool
import pool from "../helper/dbConnection.js";
//validation?
//import {validate} from "express-validation";
//import {orderValidation} from "../middleware/validation.js";

import { isAuth } from '../middleware/auth.js';
//import {orderValidation} from "../middleware/validation.js";
import {Email} from "../helper/email.js";


const router = express.Router();

//Get order details by sellerId
router.get("/seller",isAuth, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("SELECT * FROM orderdetail WHERE sellerID = ?", [req.user.userID], (err, rows) => {
            connection.release();
            if (!err) {
                res.status(200).send(rows);
            } else {
                res.status(400).send('Bad request for orderdetails by seller ID.')
            }
        });
    });
});

//Get order details by buyerId
router.get("/buyer",isAuth, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("SELECT * FROM orderdetail WHERE buyerID = ?", [req.user.userID], (err, rows) => {
            connection.release();
            if (!err) {
                res.status(200).send(rows);
            } else {
                res.status(400).send('Bad request for orderdetails by buyer ID.')
            }
        });
    });
});

//Get order details by orderId //todo: add option for admin here or in adminRouter?
router.get("/buyer",isAuth, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("SELECT * FROM orderdetail WHERE orderID = ? AND ( sellerID = ? OR buyerID = ?)", [req.params.orderID, req.user.userID, req.user.userID], (err, rows) => {
            connection.release();
            if (!err) {
                res.status(200).send(rows);
            } else {
                res.status(400).send('Bad request for orderdetails by buyer ID.')
            }
        });
    });
});

//add new orderdetail ,validate(orderDetailValidation, {}, {})
router.post("/" ,(req, res) => {
    pool.getConnection((err, connection) => {
        const data = req.body;
        if (err) throw err;
        connection.query("INSERT INTO orderdetails SET ?", data, (err, rows) => {
            if (!err) {
                //get info of both seller and buyer, todo: is buyer's info necessary here?
                //connection.query("SELECT * FROM users WHERE userid = ? OR userid = ?", [data.sellerID, data.buyerID], (err, rows) => {
                    connection.release();
                    // if (!err) {
                         res.status(200).send(rows);
                    //     //send mail to seller
                    //     Email.orderMail(rows[0].emailAddress).catch(console.error);
                    //     //send mail to buyer
                    //     Email.orderMail(rows[1].emailAddress).catch(console.error);
                //     } else {
                //         res.status(400).send("Bad request for seller & buyer data");
                //     }
                // });

            } else {
                connection.release();
                //?
                res.status(400).send('Bad orderdetails post request')
            }

        });
    });
});

export default router;