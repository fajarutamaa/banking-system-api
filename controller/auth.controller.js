const jwt = require('jsonwebtoken')
const { ComparePassword, HashPassword } = require('../helper/pass.helper')
const { ResponseFormatter, } = require('../helper/resp.helper')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

require('dotenv').config()

async function Register(req, res, next) {

    const { name, email, password } = req.body

    const hashPass = await HashPassword(password)

    const payload = {
        name: name,
        email: email,
        password: hashPass
    }

    try {

        const checkUser = await prisma.user.findUnique({
            where: {
                email,
            }
        })

        if (checkUser) {
            let respons = ResponseFormatter(null, 'email already used', null, 400)
            res.status(400).json(respons)
            return
        }

        await prisma.user.create({
            data: {
                payload,
            },
        })

        let respons = ResponseFormatter(null, 'created success', null, 200)
        res.status(200).json(respons)
        return

    } catch (error) {
        next(error)
    }
}

async function Login(req, res, next) {

    const { email, password } = req.body

    try {

        const user = await prisma.user.findUnique({
            where: {
                email: email,
            }
        })

        if (!user) {
            let respons = ResponseFormatter(null, 'bad request', 'invalid email or password', 400)
            res.status(400).json(respons)
            return
        }

        let checkPassword = await ComparePassword(password, user.password)

        if (!checkPassword) {
            let respons = ResponseFormatter(null, 'bad request', 'invalid email or password', 400)
            res.status(400).json(respons)
            return
        }

        let token = jwt.sign(user, process.env.SECRET_KEY)

        let respons = ResponseFormatter({ user, token }, 'success', null, 200)
        res.status(200).json(respons)
        return

    } catch (error) {
        next(error)
    }

}

function Whoami(req, res) {
    let respons = ResponseFormatter({ user: req.user }, 'success', null, 200)
    res.status(200).json(respons)
    return
}


module.exports = {
    Register,
    Login,
    Whoami
}
