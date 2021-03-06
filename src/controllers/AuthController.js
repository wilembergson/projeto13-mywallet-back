import bcrypt from 'bcrypt'
import db from '../db.js'

export async function getUsers(req, res){
    try{
        const users = await db.collection('users').find().toArray()
        res.send(users)
    }catch(error){
        res.sendStatus(500)
    }
}

export async function signUp(req, res){
    const {user} = res.locals
    try{
        const cryptPassword = bcrypt.hashSync(user.password,10)
        await db.collection('users').insertOne({
            name: user.name,
            email: user.email,
            password: cryptPassword
        })
        res.status(201).send('Cadastro realizado com sucesso!')
        return
    }catch(error){
        res.sendStatus(400)
    }
}

export async function signIn(req, res){
    const { token, userId, userName } = res.locals.loginData
    try{
        await db.collection('sessions').insertOne({token, userId})
        res.status(200).send({token, userName})  
    }catch(error){
        res.sendStatus(500)
    }
}