const { ResponseFormatter } = require('../helper/resp.helper')
const Joi = require('joi')

function CheckUser(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().max(255).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()]{8,30}$')).required(),
        identity_type: Joi.string().valid('KTP', 'SIM', 'KK').required(),
        identity_number: Joi.number().integer().positive().required(),
        address: Joi.string().required()
    })

    const { error } = schema.validate(req.body)
    if (error) {
        let respons = ResponseFormatter(
            null,
            'invalid request',
            error.details[0].message,
            400)
        res.json(respons)
        return
    }

    next()
}

function CheckAccount(req, res, next) {
    const schema = Joi.object({
        user_id: Joi.number().integer().positive().required(),
        bank_name: Joi.string().valid('BNI', 'BRI', 'MANDIRI', 'BCA', 'BSI').required(),
        bank_account_number: Joi.number().integer().positive().required()
    })

    const { error } = schema.validate(req.body)
    if (error) {
        let respons = ResponseFormatter(
            null,
            'invalid request',
            error.details[0].message,
            400)
        res.json(respons)
        return
    }
    next()
}

function CheckTransaction(req, res, next) {
    const schema = Joi.object({
        source_account_id: Joi.number().integer().positive().required(),
        destination_account_id:  Joi.number().integer().positive().required(),
        amount: Joi.number().integer().positive().required()
    })

    const { error } = schema.validate(req.body)
    if (error) {
        let respons = ResponseFormatter(
            null,
            'invalid request',
            error.details[0].message,
            400)
        res.json(respons)
        return
    }
    next()
}



module.exports = {
    CheckUser,
    CheckAccount,
    CheckTransaction
}

