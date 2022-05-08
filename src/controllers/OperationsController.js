
import dayjs from "dayjs"
import db from "../db.js"

export async function Operation(req, res){
    const operation = req.body
    const {authorization} = req.headers
    const token = authorization?.replace("Bearer", "").trim()

    const session = await db.collection('sessions').findOne({token})
    if(!session){
        res.status(401).send(authorization)
    }

    try{
        await db.collection('operations').insertOne({
            date: getDate(),
            description: operation.description,
            value: operation.value,
            type: operation.type,
            userId: session.userId
        })
        res.status(201).send('Operação realizado com sucesso.')
    }catch(error){
        res.status(500).send('Deu ruim.')
    }
}

export async function getOperations(req, res){
    const {authorization} = req.headers
    const token = authorization?.replace("Bearer", "").trim()

    const session = await db.collection('sessions').findOne({token})
    if(!session){
        res.status(401).send(authorization)
    }

    try{
        const operations = await db.collection('operations').find({userId: session.userId}).toArray()
        res.send(operations)
    }catch(error){
        res.status(500).send('Deu ruim.')
    }
}

function getDate(){
    let day = dayjs().date()
    let month = dayjs().month() + 1

    if(day < 10){
        day =`0${day}`
    }
    if(month < 10){
        month =`0${month}`
    }
    return `${day}/${month}`
}