import express from 'express'

const router = express.Router();

//Get all users
router.get('/', (req,res) => {
    res.send('allOrders')
})

export default router