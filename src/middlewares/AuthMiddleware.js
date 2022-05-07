import Joi from 'joi'
import db from '../db.js'

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