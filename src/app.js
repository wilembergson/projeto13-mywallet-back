import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

app.get("/message", (req, res)=>{
    res.send({name: "Berg"})
})

app.listen(5000, ()=>{
    console.log("Running...")
})