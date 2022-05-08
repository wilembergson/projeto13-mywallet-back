import Joi from 'joi'
import db from '../db.js'
import bcrypt from 'bcrypt'
import {v4 as uuid} from 'uuid'

export async function signUpValidation(req, res, next){
    const user = req.body
    const userSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        repeatPassword: Joi.string().valid(user.password).required()
    })
    const {error} = userSchema.validate(user)
    if(error) return res.status(422).json({message:'Complete o cadastro corretamente.'})

    try{
        const existentUser = await db.collection('users').findOne({email: user.email})
        if(existentUser) return res.sendStatus(409)
    }catch(e){
        res.sendStatus(500)
    }

    res.locals.user = user
    next()
}

export async function signInValidation(req, res, next){
    const login = req.body
    
    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
    const {error} = loginSchema.validate(login)
    if(error) return res.status(404).send('Email ou senha incorretos.')

    try{
        const user = await db.collection('users').findOne({email: login.email})
        if(user && bcrypt.compareSync(login.password, user.password)){
            const token = uuid()
            res.locals.loginData = {
                token: token,
                userId: user._id,
                userName: user.name
            }
        }else{
            res.status(404).send('Usuário ou senha incorretos!')
        }
    }catch(error){
        res.sendStatus(500)
    }
    next()
}