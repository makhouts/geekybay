import express from "express";
import pool from "../helper/dbConnection.js";
import multer from "multer";
import fs from "fs";
import path from "path";

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

router.get("/2.png", (req, res) => {
    console.log(__dirname);
    res.sendFile(path.join(__dirname, "/2.png"));
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

router.post("/", (req, res) => {
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

router.put("/:id", (req, res) => {
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
    dest: "backend/Temp",
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
} );
router.post(
    "/upload",
    upload.single("file" /* name attribute of <file> element in your form */),
    (req, res) => {
        const tempPath = req.file.path;
        const targetPath = path.join(__dirname, "./uploads/image.png");

        if (path.extname(req.file.originalname).toLowerCase() === ".png") {
            fs.rename(tempPath, targetPath, err => {
                if (err) return handleError(err, res);

                res
                    .status(200)
                    .contentType("text/plain")
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