import express from "express";
import pool from "../helper/dbConnection.js";
//validation
import {validate} from "express-validation";
import {orderValidation, productValidation} from "../middleware/validation.js";

const router = express.Router();

//Get all products

router.get("/", (req, res) => {
    pool.getConnection((err, connection) => {
        //check here for searches also, ~ if isset req.query.search
        if (err) throw err;
        connection.query("SELECT * from products", (err, rows) => {
            connection.release();
            if (!err) {
                res.status(200).send(rows);
            } else {
                res.status(400).send('Bad request')
            }
        });
    });
});

//Get product by sellerid
router.get("/:sellerID", (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("SELECT * FROM products WHERE sellerID = ?", [req.params.sellerID], (err, rows) => {
            connection.release();
            if (!err) {
                res.status(200).send(rows);
            } else {
                res.status(400).send('Bad get product by sellerId request')
            }
        });
    });
});

//Get product by name
router.get("/product/:productId", (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("SELECT * FROM products WHERE productID = ?", [req.params.productId], (err, rows) => {
            connection.release();
            if (!err) {
                res.status(200).send(rows);
            } else {
                res.status(400).send('Bad get product by productId request')
            }
        });
    });
});


//Get product by price

// router.get("/price/:price", (req, res) => {
//     pool.getConnection((err, connection) => {
//         if (err) throw err;
//         connection.query("SELECT * FROM products WHERE price ", [req.params.productName], (err, rows) => {
//             connection.release();
//             if (!err) {
//                 res.status(200).send(rows);
//             } else {
//                 res.status(400).send('Bad get product by price request')
//             }
//         });
//     });
// });

//Create product

router.post("/", validate(productValidation, {}, {}), (req, res) => {
    console.log(req.body);
    pool.getConnection((err, connection) => {
        if (err) throw err;
        const params = req.body
        connection.query('INSERT INTO products SET ?' , params, (err, rows) => {
            connection.release();
            if (!err) {
                res.status(201).send(rows);
            } else {
                res.status(400).send('Bad product creation request')
            }
        });
    });
});

//Update product

router.put("/:id", validate(productValidation, {}, {}), (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        const data = req.body
        connection.query('UPDATE products SET ? WHERE productID=?', [data , req.params.id] , (err, rows) => {
            connection.release();
            if (!err) {
                res.status(201).send(rows);
            } else {
                res.status(400).send('Bad product update request')
            }
        });
    });
});

//potentially not allowed to delete if bidding not finished.
//Delete product
router.delete("/:id", (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query('DELETE FROM products WHERE productID=?', req.params.id, (err, rows) => {
            connection.release();
            if (!err) {
                res.status(200).send(rows);
            } else {
                res.status(400).send('Bad product delete request')
            }
        });
    });
});



export default router;