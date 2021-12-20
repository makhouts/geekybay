import express from 'express'
import userRouter from './routes/userRouter.js'
import orderRouter from './routes/orderRouter.js'

const app = express();

app.use('/users', userRouter)
app.use('/orders', orderRouter)

app.listen(3000)