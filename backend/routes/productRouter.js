import express from "express";
import pool from "../helper/dbConnection.js";
//validation
import { validate } from "express-validation";
import { orderValidation, productValidation } from "../middleware/validation.js";
//process multiform data
import multer from "multer";
import path from "path";
import * as uploadController from "./../middleware/upload.js"
import fs from "fs";
// import { v4 as uuidv4 } from 'uuid';
//needed for images
import { fileURLToPath } from "url";
import { dirname } from "path";
import { isAuth } from "../middleware/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

//Get all products
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
//imagegetter refactoring for use in getter by any other means.

//Get products by sellerid
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

//Get products by sellerid also where its not visible
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

//Get product by id -> for the product details page TODO:
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

//Get product by id -> for the product details page for sellers
router.get("/seller-product/:productId", isAuth, (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      "SELECT * FROM products WHERE productID = ? AND sellerID = ?",
      [req.params.productId, req.user.userID],
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
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query("SELECT productImg FROM productimages WHERE productID = ?", [req.params.productId], (err, productImg) => {
      connection.release();
      if (!err) {
        console.log(productImg);
        res.sendFile(path.join(__dirname, "../uploads/" + productImg[0].productImg));
      } else {
        res.status(400).send("Bad product image request");
      }
    });
  });
});



//upload.js

//this needs to happen after resizing.
//Create product

// router.post("/", validate(productValidation, {}, {}), (req, res) => {
//     const upload = multer({ dest: 'uploads/' })
//
//     console.log(req.body);
//     pool.getConnection((err, connection) => {
//         if (err) throw err;
//         const params = req.body
//         connection.query('INSERT INTO products SET ?' , params, (err, rows) => {
//             connection.release();
//             if (!err) {
//                 res.status(201).send(rows);
//
//             } else {
//                 res.status(400).send('Bad product creation request')
//             }
//         });
//

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_"+ (file.originalname.split('.')[0]) + path.extname(file.originalname)) //Appending extension
  }
})

let upload = multer({ storage: storage });
//Create product TODO:

router.post( "/multiple-upload", /*isAuth,*/
    uploadController.uploadImages,
    uploadController.resizeImages,
    uploadController.getResult,
    /*upload.single('avatar'),*/ /*validate(productValidation, {}, {}),*/ (req, res) => {
      pool.getConnection((err, connection) => {
        if (err) throw err;
        const params = req.body;
        /*        params.sellerID = req.user.userID;*/
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

/*
router.post("/", isAuth, upload.single('avatar'), /!*validate(productValidation, {}, {}),*!/ (req, res) => {
  // console.log(req.body)
  
  // console.log(req.file.filename + ".png")

  pool.getConnection((err, connection) => {
    if (err) throw err;
    const params = req.body;
    params.sellerID = req.user.userID;
    if(typeof req.file !== 'undefined'){
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
*/


//Update product

// router.put("/:id", validate(productValidation, {}, {}), (req, res) => {
//     pool.getConnection((err, connection) => {
//         if (err) throw err;
//         const action = 'update';
//         const data = req.body;
//         connection.query('UPDATE products SET ? WHERE productID=?', [data , req.params.id] , (err, rows) => {
//             if (!err) {
//                 //res.status(201).send(rows);
//                 //send email to seller if update successful
//                 //get email for both seller and buyer,
//                 connection.query("SELECT * FROM users WHERE userid = ?", [data.sellerID], (err, rows) => {
//                     connection.release();
//                     if (!err) {
//                         res.status(200).send(rows);
//                         //send mail to seller
//                         email(rows[0].emailAddress, action).catch(console.error);
//                     } else {
//                         res.status(400).send("Bad request for seller & buyer data");
//                     }
//                 });
//             } else {
//                 connection.release();
//                 res.status(400).send('Bad product update request')
//             }
//         });

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
  res.status(500).contentType("text/plain").end("Oops! Something went wrong!");
};

router.post("/upload", isAuth, upload.single("productimage" /* name attribute of <file> element in your form */), (req, res) => {
  const tempPath = req.file.path;
  const targetPath = path.join(__dirname, "../productimages/image3.png");
  if (path.extname(req.file.originalname).toLowerCase() === ".png") {
    fs.rename(tempPath, targetPath, (err) => {
      if (err) return handleError(err, res);
      res.status(200).contentType("image/png").end("File uploaded!");
    });
  } else {
    fs.unlink(tempPath, (err) => {
      if (err) return handleError(err, res);

      res.status(403).contentType("text/plain").end("Only .png files are allowed!");
    });
  }
});

export default router;
