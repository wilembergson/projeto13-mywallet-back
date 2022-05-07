import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import authRouter from './routes/AuthRouter.js'

const app = express()
app.use(express.json())
app.use(cors())

app.use(authRouter)

app.listen(process.env.PORTA)