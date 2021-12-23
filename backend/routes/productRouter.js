import express from "express";
import pool from "../helper/dbConnection.js";
//validation
import {validate} from "express-validation";
import {orderValidation, productValidation} from "../middleware/validation.js";
//process multiform data
import multer from "multer";
import path from "path";
import fs from "fs" ;
import { v4 as uuidv4 } from 'uuid';
//needed for images
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
//imagegetter refactoring for use in getter by any other means.


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
                res.sendFile(path.join(__dirname,"../productimages/"+rows[0].productImg));
            } else {
                res.status(400).send('Bad get product by productId request')
            }
        });
    });
});

router.get("/product/img/:productId", (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
            connection.query("SELECT productImg FROM products WHERE productID = ?", [req.params.productId], (err, productImg) => {
            connection.release();
            if (!err) {
                console.log(productImg);
                res.sendFile(path.join(__dirname,"../productimages/"+productImg[0].productImg));
            } else {
                res.status(400).send('Bad product image request')
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
    const upload = multer({ dest: 'uploads/' })
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
//Multer test for implementation: using router and post. multipart form data.

const handleError = (err, res) => {
    res
        .status(500)
        .contentType("text/plain")
        .end("Oops! Something went wrong!");
};
const upload = multer({
    dest: "./Temp",
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
} );

router.post(
    "/upload",
    upload.single("productimage" /* name attribute of <file> element in your form */),
    (req, res) => {
        const tempPath = req.file.path;
        const targetPath = path.join(__dirname, "../productimages/image3.png");
        if (path.extname(req.file.originalname).toLowerCase() === ".png") {
            fs.rename(tempPath, targetPath, err => {
                if (err) return handleError(err, res);
                res
                    .status(200)
                    .contentType("image/png")
                    .end("File uploaded!");
            });
        } else {
            fs.unlink(tempPath, err => {
                if (err) return handleError(err, res);

                res
                    .status(403)
                    .contentType("text/plain")
                    .end("Only .png files are allowed!");
            });
        }
    }
);





export default router;