import bcrypt from 'bcrypt'
import db from '../db.js'
import {v4 as uuid} from 'uuid'

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
    const login = req.body
    try{
        const user = await db.collection('users').findOne({email: login.email})
        if(user && bcrypt.compareSync(login.password, user.password)){
            const token = uuid()
            await db.collection('sessions').insertOne({token: token, userId: user._id})
            res.status(200).send({token: token, userName: user.name})
        }else{
            res.status(404).send('Usuário ou senha incorretos!')
        }
    }catch(error){
        res.sendStatus(500)
    }
}