import express from 'express'
// import bcrypt from 'bcrypt'

const router = express.Router();

//Get all products
router.get('/', (req,res) => {
    res.send('allproducts')
})

//Get product by productID


//Get product by sellerID


//Get product by price


//Create product


//Update product


//Delete product



export default router