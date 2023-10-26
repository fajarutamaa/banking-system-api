const { ResponseFormatter } = require('../helper/resp.helper')
const Joi = require('joi')

function CheckProcess(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().alphanum().max(255).required(),
        password: Joi.string().alphanum().required()
    })

    const { error } = schema.validate(req.body)
    if (error) {
        let respons = ResponseFormatter(null, 'invalid request', error.details[0].message, 400)
        res.json(respons)
        return
    }

    next()

}

module.exports = {
    CheckProcess
}