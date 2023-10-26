const { ResponseFormatter } = require('../helper/resp.helper')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

function TestUser(req, res) {
    let resp = ResponseFormatter(null, 'success', null, 200)
    res.json(resp)
    return
}

async function Insert(req, res) {

    const { name, password } = req.body

    const payload = {
        name,
        password,

    }

    try {
        const user = await prisma.user.create({
            data: payload
        })

        let respons = ResponseFormatter(user, 'success', null, 200)
        return res.json(respons)

    } catch (error) {
        let respons = ResponseFormatter(null, 'internal server error', error, 500)
        res.json(respons)
        return
    }
}

async function Get(res, req) {

    const { name, password } = req.query

    const payload = {}

    if (name) {
        payload.name = name
    }

    if (password) {
        payload.password = password
    }

    try {
        const users = await prisma.user.findMany({
            where: payload,
            include: {
                post: {
                    where: {
                        address: address
                    }
                }
            }
        })
        let resp = ResponseFormatter(users, 'success', null, 200)
        res.json(resp)
        return
    } catch (error) {
        let resp = ResponseFormatter(null, 'internal server error', error, 500)
        res.json(resp)
        return
    }
}


module.exports = {
    TestUser,
    Insert,
    Get
}