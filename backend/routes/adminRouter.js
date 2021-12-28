import express from "express";
import pool from "../helper/dbConnection.js";
import { isAdmin } from "../middleware/auth.js";
import {validate} from "express-validation";
import { orderValidation, productValidation } from "../middleware/validation.js";

const router = express.Router();

router.use(isAdmin);

//USERS

// Get all users
router.get("/users", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query("SELECT * from users", (err, rows) => {
      connection.release();
      if (!err) {
        res.status(200).send(rows);
      } else {
        res.status(400).send("Bad request");
      }
    });
  });
});

//Get user by id
router.get("/users/:id", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query("SELECT * FROM users WHERE userid = ?", [req.params.id], (err, rows) => {
      connection.release();
      if (!err) {
        res.status(200).send(rows);
      } else {
        res.status(400).send("Bad request");
      }
    });
  });
});

//Update user
router.put("/users/:id", async (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const data = req.body;
    connection.query("UPDATE users SET ? WHERE userID = ?", [data, req.params.id], (err, rows) => {
      connection.release();
      if (!err) {
        res.status(200).send(rows);
      } else {
        res.status(400).send({ message: "Could not update user" });
      }
    });
  });
});

//Delete user by id
router.delete("/users/:id", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query("DELETE FROM users WHERE userID = ?", [req.params.id], (err, rows) => {
      connection.release();
      if (!err) {
        res.status(204);
      } else {
        res.status(400).send(err);
      }
    });
  });
});

//Products

// Get all products
router.get("/products", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query("SELECT * from products", (err, rows) => {
      connection.release();
      if (!err) {
        res.status(200).send(rows);
      } else {
        res.status(400).send("Bad request");
      }
    });
  });
});

// Get products by sellerID
router.get("/products/:sellerId", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query("SELECT * FROM products WHERE sellerID = ?", [req.params.sellerId], (err, rows) => {
      connection.release();
      if (!err) {
        res.status(200).send(rows);
      } else {
        res.status(400).send("Bad get product by sellerId request");
      }
    });
  });
});

// Get product by id
router.get("/product/:productId", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query("SELECT * FROM products WHERE productID = ?", [req.params.productId], (err, rows) => {
      connection.release();
      if (!err) {
        res.status(200).send(rows);
        res.sendFile(path.join(__dirname, "../productimages/" + rows[0].productImg));
      } else {
        res.status(400).send("Bad get product by productId request");
      }
    });
  });
});

//Create product
router.post("/products", validate(productValidation, {}, {}), (req, res) => {
  const upload = multer({ dest: "uploads/" });
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const params = req.body;
    params.sellerID = req.user.userID;
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

//Update product
router.put("/products/:id", validate(productValidation, {}, {}), (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const data = req.body;
    connection.query("UPDATE products SET ? WHERE productID=?", [data, req.params.id], (err, rows) => {
      connection.release();
      if (!err) {
        res.status(201).send(rows);
      } else {
        res.status(400).send("Bad product update request");
      }
    });
  });
});

//Delete product
router.delete("/products/:id", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query("DELETE FROM products WHERE productID=?", [req.params.id], (err, rows) => {
      connection.release();
      if (!err) {
        res.status(200).send(rows);
      } else {
        res.status(400).send("Bad product delete request");
      }
    });
  });
});


// ORDERS

// Get all orders 
router.get('/orders', (req,res) => {
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
router.get("/orders/:id", (req, res) => {
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
router.get("/orders/:sellerId", (req, res) => {
  pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query("SELECT * FROM orders WHERE sellerID = ?", [req.params.sellerId], (err, rows) => {
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
router.get("/orders/:buyerId", (req, res) => {
  pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query("SELECT * FROM orders WHERE buyerID = ?", [ req.params.buyerId], (err, rows) => {
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
router.post("/oders", validate(orderValidation, {}, {}) ,(req, res) => {
  pool.getConnection((err, connection) => {
      const data = req.body;
      if (err) throw err;
      connection.query("INSERT INTO orders SET ?", data, (err, rows) => {
          connection.release();
          if (!err) {
              res.status(201).send(rows);
          } else {
              res.status(400).send('Bad request')
          }
      });
  });
});

//update order
router.put("/orders/:id",validate(orderValidation, {}, {}), (req, res) => {
    pool.getConnection((err, connection) => {
        const data = req.body;
        if (err) throw err;
        connection.query("UPDATE orders SET ? WHERE orderID=?", [data, req.params.id], (err, rows) => {
            connection.release();
            if (!err) {
                res.status(201).send(rows);
            } else {
                res.status(400).send('Bad request')
            }
        });
    });
});


//cancel order: TODO: get back to later
router.put("/orders/cancel/:id", (req, res) => {
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


export default router;
