const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { ResponseFormatter } = require('../helper/resp.helper')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
require('dotenv').config()

async function Register(req, res, next) {

    const { name, email, password } = req.body

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
        const saltRounds = parseInt(process.env.SALT_ROUNDS)
        let encryptedPassword = await bcrypt.hash(password, saltRounds)
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: encryptedPassword,
            },
        })
        let respons = ResponseFormatter(user, 'created success', null, 201)
        res.status(201).json(respons)
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
                email,
            }
        })

        if (!user) {
            let respons = ResponseFormatter(null, 'bad request', 'invalid email or password', 400)
            res.status(400).json(respons)
            return
        }

        let isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            let respons = ResponseFormatter(null, 'bad request', 'invalid email or password', 400)
            res.status(400).json(respons)
            return
        }

        let token = jwt.sign(user, 'JWT_SECRET_KEY')
        let respons = ResponseFormatter({ user, token }, 'Created', null, 201)
        res.status(201).json(respons)
        return

    } catch (error) {
        next(error)
    }

}


module.exports = {
    Register,
    Login
}
