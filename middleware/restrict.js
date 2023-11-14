const { ResponseFormatter } = require('../helper/resp.helper')
const jwt = require('jsonwebtoken')


async function Authenticate(req, res, next) {

    const { authorization } = req.headers

    if (!authorization) {
        let response = ResponseFormatter(null, 'user unauthorized', null, 401)
        res.status(401).json(response)
        return
    }

    try {
        const user = await jwt.verify(authorization, process.env.SECRET_KEY)
        req.user = user
        next()
    } catch (error) {
        let response = ResponseFormatter(null, 'user unauthorized', error, 400)
        res.status(401).json(response)
        return
    }
}


module.exports = {
    Authenticate
}