import express from 'express'
import userRouter from './routes/userRouter.js'
import productRouter from './routes/productRouter.js'

const app = express();

app.use('/users', userRouter)
app.use('/products', productRouter)

app.listen(3000)