const { ResponseFormatter, Pagination } = require('../helper/resp.helper')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


async function Insert(req, res) {

    const { name, password, email, identity_type, identity_number, address } = req.body

    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
                profile: {
                    create: {
                        identity_type,
                        identity_number: parseInt(identity_number),
                        address
                    }
                }

            }
        })
        let respons = ResponseFormatter(user, 'created user success', null, 200)
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
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
                profile: {
                    select: {
                        user_id: true,
                        identity_type: true,
                        identity_number: true,
                        address: true,
                    }
                }
            },
            where: {
                id: parseInt(id)
            },
        })
        let respons = ResponseFormatter(users, 'fetch user detail success', null, 200)
        res.json(respons)
        return
    } catch (error) {
        let respons = ResponseFormatter(null, 'internal server error', error, 500)
        res.json(respons)
        return
    }
}


async function GetAll(req, res) {

    const { name, password, email, page, perPage } = req.query

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
        const totalCount = await prisma.user.count({
            where: payload,
        })

        const currentPage = parseInt(page) || 1
        const itemsPerPage = parseInt(perPage) || 10

        const users = await prisma.user.findMany({
            where: payload,
            orderBy: {
                id: 'asc'
            },
            skip: (currentPage - 1) * itemsPerPage,
            take: itemsPerPage,
        })

        const totalPages = Math.ceil(totalCount / itemsPerPage)

        let pagination = Pagination(currentPage, totalCount, totalPages)
        let respons = ResponseFormatter(users, 'fetch all user success', null, 200)
        res.json({ data: respons, pagination })
        return
    } catch (error) {
        console.log(error)
        let respons = ResponseFormatter(null, 'internal server error', error, 500)
        res.json(respons)
        return
    }
}

async function Delete(req, res) {

    const { id } = req.params

    try {
        const users = await prisma.user.delete({
            where: {
                id: parseInt(id),
            }
        })

        let respons = ResponseFormatter(users, 'delete user success', null, 200)
        res.json(respons)
        return
    } catch (error) {
        console.log(error)
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
                id: parseInt(id)
            },
            data: payload,
        })
        let respons = ResponseFormatter(user, 'update user success', null, 200)
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