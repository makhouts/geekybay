import express from 'express';
//import connection pool
import pool from "../helper/dbConnection.js";
//validation
import {validate} from "express-validation";
import {orderDetailValidation} from "../middleware/validation.js";
//authentication
import { isAuth } from '../middleware/auth.js';
import {Email} from "../helper/email.js";


const router = express.Router();

//Get order details by sellerId
router.get("/seller",isAuth, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("SELECT * FROM orderdetails WHERE sellerID = ?", [req.user.userID], (err, rows) => {
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
        connection.query("SELECT * FROM orderdetails WHERE buyerID = ?", [req.user.userID], (err, rows) => {
            connection.release();
            if (!err) {
                res.status(200).send(rows);
            } else {
                res.status(400).send('Bad request for orderdetails by buyer ID.')
            }
        });
    });
});

//Get order details by orderId
router.get("/order",isAuth, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("SELECT * FROM orderdetails WHERE orderID = ? AND ( sellerID = ? OR buyerID = ?)", [req.params.orderID, req.user.userID, req.user.userID], (err, rows) => {
            connection.release();
            if (!err) {
                res.status(200).send(rows);
            } else {
                res.status(400).send('Bad request for order details by buyer ID.')
            }
        });
    });
});

//add new orderdetail
router.post("/" , validate(orderDetailValidation, {}, {}),(req, res) => {
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

//cancel order as seller
router.put("/cancel/:id", isAuth, (req, res) => {
    pool.getConnection((err, connection) => {
        const orderStatus = "canceled";
        if (err) throw err;
        //params is a request parameter in the url
        connection.query("UPDATE orderdetails SET orderStatus=? WHERE orderDetailID=? AND sellerID=?", [orderStatus, req.params.id, req.user.userID], (err, rows) => {
            connection.release();
            if (!err) {
                console.log(rows);
                //the request has succeeded and a new resource has been created as a result.
                res.status(201).send(rows);
            } else {
                //?
                res.status(400).send('Bad request')
            }
        });
    });
});

//cancel order as buyer (only if logged in)
router.put("/cancel/buyer/:id", isAuth, (req, res) => {
    pool.getConnection((err, connection) => {
        const orderStatus = "canceled";
        if (err) throw err;
        connection.query("SELECT orderStatus FROM orderdetails WHERE orderDetailID=?"), [req.params.id], (err, rows) => {
            connection.release();
            if (!err) {
                console.log(rows);

            } else {
                res.status(400).send('Bad request for existing order status.')
            }
        };
        // //params is a request parameter in the url
        // connection.query("UPDATE orderdetails SET orderStatus=? WHERE orderID=? AND buyerID=?", [orderStatus, req.params.id, req.user.userID], (err, rows) => {
        //     connection.release();
        //     if (!err) {
        //         //the request has succeeded and a new resource has been created as a result.
        //         res.status(201).send(rows);
        //     } else {
        //         //?
        //         res.status(400).send('Bad request')
        //     }
        // });
    });
});

//confirm order
router.put("/confirm/:id", isAuth, (req, res) => {
    pool.getConnection((err, connection) => {
        const orderStatus = "confirmed";
        if (err) throw err;
        //params is a request parameter in the url
        connection.query("UPDATE orderdetails SET orderStatus=?, confirmationDate = CURRENT_DATE() WHERE orderDetailID=? AND sellerID=?", [orderStatus, req.params.id, req.user.userID], (err, rows) => {
            if (!err) {
                connection.query("SELECT * FROM users LEFT JOIN orderdetails o on users.userID = o.sellerID WHERE orderDetailID=?;", [req.params.id], (err, rows) => {
                    connection.release();
                    //the request has succeeded and a new resource has been created as a result.
                    if (!err) {
                        console.log(rows);
                        res.status(200).send(rows);
                        //send mail to buyer
                        Email.orderConfirmationMail(rows[0].emailAddress).catch(console.error);
                    } else {
                        res.status(400).send("Bad request for seller & buyer data");
                    }
                });
            } else {
                connection.release();
                res.status(400).send('Bad request for order details')
            }
        });
    });
});
export default router;