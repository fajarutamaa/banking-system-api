const { ResponseFormatter } = require('../helper/resp.helper')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


async function Insert(req, res) {

    const { name, password, email } = req.body

    const payload = {
        name,
        email,
        password,
    }

    try {
        const user = await prisma.user.create({
            data: payload,
        })

        let respons = ResponseFormatter(user, 'success', null, 200)
        return res.json(respons)

    } catch (error) {
        let respons = ResponseFormatter(null, 'internal server error', error, 500)
        res.json(respons)
        return
    }
}

async function GetById(req, res) {

    const { id } = req.params

    try {
        let users = await prisma.user.findUnique({
            where: {
                id: Number(id)
            },
        })
        let respons = ResponseFormatter(users, 'success', null, 200)
        res.json(respons)
        return
    } catch (error) {
        let respons = ResponseFormatter(null, 'internal server error', error, 500)
        res.json(respons)
        return
    }
}


async function GetAll(req, res) {
    const { name, password, email } = req.query

    const payload = {}

    if (name) {
        payload.name = name
    }

    if (email) {
        payload.email = email
    }

    if (password) {
        payload.password = password
    }

    try {
        const users = await prisma.user.findMany({
            where: payload,
        })

        let respons = ResponseFormatter(users, 'success', null, 200)
        res.json(respons)
        return
    } catch (error) {
        let respons = ResponseFormatter(null, 'internal server error', error, 500)
        res.json(respons)
        return
    }
}

async function Delete(req, res) {

    const { id } = req.params

    try {
        let users = await prisma.user.delete({
            where: {
                id: Number(id)
            },
        })
        let respons = ResponseFormatter(users, 'success', null, 200)
        res.json(respons)
        return
    } catch (error) {
        let respons = ResponseFormatter(null, 'internal server error', error, 500)
        res.json(respons)
        return
    }

}

async function Update(req, res) {

    const { name, password, email } = req.body
    const { id } = req.params

    const payload = {}


    if (!name && !password && !email) {
        let resp = ResponseFormatter(null, 'bad request', null, 400)
        res.json(resp)
        return
    }

    if (name) {
        payload.name = name
    }

    if (email) {
        payload.email = email
    }

    if (password) {
        payload.password = password
    }

    try {
        const user = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: payload
        })
        let respons = ResponseFormatter(user, 'success', null, 200)
        res.json(respons)
        return
    } catch (error) {
        let respons = ResponseFormatter(null, 'internal server error', error, 500)
        res.json(respons)
        return
    }
}

module.exports = {
    Insert,
    GetById,
    Delete,
    Update,
    GetAll
}