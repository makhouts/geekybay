import express from "express";
import pool from "../helper/dbConnection.js";
//validation
import {validate} from "express-validation";
import {orderValidation, productValidation} from "../middleware/validation.js";

//process multiform data
import multer from "multer";
import path from "path";
import * as uploadController from "./../middleware/upload.js" // here uploadController
import fs from "fs";
// import { v4 as uuidv4 } from 'uuid';

//needed for images
import {fileURLToPath} from "url";
import {dirname} from "path";
import {isAuth} from "../middleware/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// WORKING: Get all products
//Get all products NOTE:
router.get("/", (req, res) => {
    pool.getConnection((err, connection) => {
        //check here for searches also, ~ if isset req.query.search
        if (err) throw err;
        connection.query("SELECT * from products where visible = 1", (err, rows) => {
            connection.release();
            if (!err) {
                res.status(200).send(rows);
            } else {
                res.status(400).send("Bad request");
            }
        });
    });
});

// WORKING:  Get products by sellerid
router.get("/:sellerId", (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("SELECT * FROM products WHERE sellerID = ? AND visible = 1", [req.params.sellerId], (err, rows) => {
            connection.release();
            if (!err) {
                res.status(200).send(rows);
            } else {
                res.status(400).send("Bad get product by sellerId request");
            }
        });
    });
});

// WORKING: Get products by sellerid also where its not visible: todo: need way to check without auth though.
router.get("/seller-products", isAuth, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("SELECT * FROM products WHERE sellerID = ?", [req.user.userID], (err, rows) => {
            connection.release();
            if (!err) {
                res.status(200).send(rows);
            } else {
                res.status(400).send("Bad get product by sellerId request");
            }
        });
    });
});

// WORKING: Get product by id -> for the product details page TODO:
router.get("/product/:productId", (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("SELECT * FROM products WHERE productID = ?", [req.params.productId], (err, rows) => {
            connection.release();
            if (!err) {
                if (rows[0].visible === 1) {
                    res.status(200).send(rows);

                } else {
                    res.status(400).send("Bad get product by productId request");
                }
            } else {
                res.status(400).send("Bad get product by productId request");
            }
        });
    });
});

//WORKING with hardcoded user and probably also after auth.  atm Get product by id -> for the product details page for sellers Sellerid needs to go through auth?
router.get("/seller-product/:productId", /*isAuth,*/ (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(
            "SELECT * FROM products WHERE productID = ? AND sellerID = ?",
            [req.params.productId, req.user.sellerID],
            (err, rows) => {
                connection.release();
                if (!err) {
                    res.status(200).send(rows);
                    res.sendFile(path.join(__dirname, "../uploads/" + rows[0].productImg));
                } else {
                    res.status(400).send("Bad get product by productId request");
                }
            }
        );
    });
});

// get product image
// TODO: is this good? anyone can access pictures of all products i think
router.get("/product/img/:productId", (req, res) => {
    console.log(req.params);
    pool.getConnection((err, connection, rows) => {
        if (err) throw err;
        connection.query("SELECT productImg FROM productimages WHERE productID = ?", [req.params.productId], (err, productImg) => {
            connection.release();
            console.log(productImg);
            if (!err) {
                    res.sendFile(path.join(__dirname, "../../uploads/" + productImg[1].productImg))
            }
                else {
                res.status(400).send("Bad product image request");
            }
        });
    });
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + (file.originalname.split('.')[0]) + path.extname(file.originalname)) //Appending extension
    }
})

let upload = multer({storage: storage});

//Create product, possible, data for a product and multiple images TODO: currently can upload multiple images.
//todo: sanitise and double-check
//todo create class/function, errorhandling in the class/function.
//using the path root/products/multiple-upload we're trying to upload both textual form data as well as multiple images that should be linked to the data.
router.post("/multiple-upload", /*isAuth,*/
    //We've created several middleware functions each responsible for an element for processing the images to a standard size.
    // uploadController is how we import these functions to reference them.
    uploadController.uploadImages, // uploading the images to an array and checking for amount of images.
    uploadController.resizeImages, // resizes the images to a specific size.
    uploadController.getResult, // displays in the console which images were uploaded
    /*validate(productValidation, {}, {}),*/  async (req, res) => {
        pool.getConnection((err, connection) => {
            if (err) throw err;
            //defining the body as the data that is uploaded.
            const uploadData = req.body; //
            console.log(uploadData)
            if (typeof req.file !== 'undefined') {
                /*uploadData.productImg = path.join(__dirname, "../uploads/" + req.file.filename)*/
                uploadData.productImg = req.file.filename
            }
            connection.query("INSERT INTO products SET productName = ?, sellerID = ?, productDescription=? , price= ?, inStock =? , visible = ?, freeShipping =?" //error is here
                , [uploadData.productName, uploadData.sellerID, uploadData.productDescription, uploadData.price, uploadData.inStock, uploadData.visible, uploadData.freeShipping],
                (err, rows) => {
                    //more queries, release later.
                    connection.release();
                    if (!err) {
                        if (req.body.productImg !== []) {
                            req.body.productImg.forEach((image) => {
                                connection.query("" +
                                    "INSERT INTO productimages SET productImg = ?, productID = ?" //error is here
                                    , [image, rows.insertId],
                                    (err) => {
                                        if (!err) {
                                            console.log(image)
                                        } else {
                                            console.error(err);
                                        }
                                    });
                            });
                            res.status(200).send('multiple images uploaded and referenced in database');
                        } else {
                            res.status(400).send("Bad product creation request");
                        }
                    }
                }
            );
        });
    });


// TESTING: for uploading just one product without image?
router.post("/", /*isAuth,*/ upload.single('avatar'), /*validate(productValidation, {}, {}),*/ (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        const params = req.body;
        /*    params.sellerID = req.user.userID;*/
        if (typeof req.file !== 'undefined') {
            // params.productImg = path.join(__dirname, "../uploads/" + req.file.filename)
            params.productImg = req.file.filename
        }
        connection.query("INSERT INTO products SET ?", params, (err, rows) => {
            connection.release();
            if (!err) {
                res.status(201).send(rows);
            } else {
                res.status(400).send("Bad product creation request");
            }
        });
    });
});
// for updating a product.
router.put("/:id", isAuth, validate(productValidation, {}, {}), (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        const data = req.body;
        connection.query("UPDATE products SET ? WHERE productID=? AND sellerID = ?", [data, req.params.id, req.user.userID], (err, rows) => {
            connection.release();
            if (!err) {
                res.status(201).send(rows);
            } else {
                res.status(400).send("Bad product update request");
            }
        });
    });
});

//potentially not allowed to delete if bidding not finished.
//Delete product
router.delete("/:id", isAuth, (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("DELETE FROM products WHERE productID=? AND sellerID = ?", [req.params.id, req.user.userID], (err, rows) => {
            connection.release();
            if (!err) {
                res.status(200).send(rows);
            } else {
                res.status(400).send("Bad product delete request");
            }
        });
    });
});


//Multer test for implementation: using router and post. multipart form data.

const handleError = (err, res) => {
    res.status(500).contentType("text/plain").end("Oops! Something went wrong!"); //check
};

export default router;
