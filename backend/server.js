import express from 'express'
import userRouter from './routes/userRouter.js'

const app = express();

app.use('/users', userRouter)

app.listen(3000)