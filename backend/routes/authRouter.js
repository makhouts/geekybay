import express from "express";
import pool from "../helper/dbConnection.js";
import bcrypt from 'bcrypt'

const router = express.Router();


router.get('/login', (req,res) => {
    //check if auth already
    // if not return true else false

})

router.get('/register', (req,res) => {
        //check if auth already
    // if not return true else false
})

router.post('/login', (req,res) => {
        //check if auth already
    // if yes return false
    // else compare entered password with db password 
    // if matches return true else false
    // this should create session as well
})

router.post('/register', (req,res) => {
            //check if auth already
    // if yes return false
    //save user 
})

app.delete('/logout', (req,res) => {
    // delete session
    // call passport logout
})

export default router