import Joi from "joi"

export async function operationValidation(req, res, next){
    const operation = req.body

    const operationSchema = Joi.object({
        description: Joi.string().required(),
        value: Joi.string().required(),
        type: Joi.string().required()  
    })
    const {error} = operationSchema.validate(operation)
    if(error) return res.status(422).send('Todos os campos são obrigatórios.')

    next()
}