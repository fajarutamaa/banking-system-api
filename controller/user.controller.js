const { ResponseFormatter, Pagination } = require('../helper/resp.helper')
const { HashPassword } = require('../helper/pass.helper')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function CreateUser(req, res) {

    const { name, password, email, identity_type, identity_number, address } = req.body
    const hashPass = await HashPassword(password)

    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashPass,
                profile: {
                    create: {
                        identity_type,
                        identity_number: parseInt(identity_number),
                        address
                    }
                }
            }
        })
        let response = ResponseFormatter(user, 'created user success', null, 200)
        res.status(200).json(response)
        return
    } catch (error) {
        let response = ResponseFormatter(null, 'internal server error', error, 500)
        res.status(500).json(response)
        return
    }
}

async function FetchUser(req, res) {

    const { id } = req.params

    try {
        const checkUser = await prisma.user.findUnique({
            where: {
                id: parseInt(id),
            }
        })

        if (!checkUser) {
            let response = ResponseFormatter(null, 'id user not found', null, 404)
            res.status(404).json(response)
            return
        } else {
            const users = await prisma.user.findUnique({
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
            let response = ResponseFormatter(users, 'fetch user detail success', null, 200)
            res.status(200).json(response)
            return
        }
    } catch (error) {
        let response = ResponseFormatter(null, 'internal server error', error, 500)
        res.status(500).json(response)
        return
    }
}


async function FetchAllUser(req, res) {

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

        const currentPage = parseInt(page) || 1
        const itemsPerPage = parseInt(perPage) || 10

        const totalCount = await prisma.user.count({
            where: payload,
        })

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
        let response = ResponseFormatter(users, 'fetch all user success', null, 200)
        res.status(200).json({ data: response, pagination })
        return
    } catch (error) {
        console.log(error)
        let response = ResponseFormatter(null, 'internal server error', error, 500)
        res.status(500).json(response)
        return
    }
}

async function DeleteUser(req, res) {

    const { id } = req.params

    try {

        const user_id = parseInt(id)

        if (isNaN(user_id) || user_id <= 0) {
            const response = ResponseFormatter(null, 'bad request : invalid id', null, 400)
            res.status(400).json(response)
            return
        }

        const userExists = await prisma.user.findUnique({
            where: {
                id: user_id,
            }
        })

        if (!userExists) {
            const response = ResponseFormatter(null, 'Bad request: User not found', null, 400)
            res.status(400).json(response)
            return
        }

        await prisma.transaction.deleteMany({
            where: {
                sourceAccount: {
                    user_id: user_id,
                }
            }
        })

        await prisma.bankAccount.deleteMany({
            where: {
                user_id: user_id,
            }
        })


        const userProfile = await prisma.profile.findUnique({
            where: {
                user_id: user_id,
            }
        })

        if (userProfile) {
            await prisma.profile.delete({
                where: {
                    id: userProfile.id,
                }
            })
        }

        await prisma.user.delete({
            where: {
                id: user_id,
            }
        })

        const response = ResponseFormatter(null, 'user and related data deleted successfully', null, 200)
        res.status(200).json(response)
        return
    } catch (error) {
        const response = ResponseFormatter(null, 'internal server error', error, 500)
        res.status(500).json(response)
        return
    }
}


async function UpdateUser(req, res) {

    const { name, password, email } = req.body
    const { id } = req.params

    const payloadUser = {}
    const payloadProfile = {}


    if (!name && !password && !email && !identity_type && !identity_number && !address) {
        let response = ResponseFormatter(null, 'bad request', null, 400)
        res.status(400).json(response)
        return
    }

    if (name) {
        payloadUser.name = name
    }

    if (email) {
        payloadUser.email = email
    }

    if (password) {
        payloadUser.password = password
    }

    if (identity_type) {
        payloadProfile.identity_type = identity_type
    }

    if (identity_number) {
        payloadProfile.identity_number = parseInt(identity_number)
    }

    if (address) {
        payloadProfile.address = address
    }

    try {
        const user = await prisma.user.update({
            where: {
                id: parseInt(id)
            },
            data: {
                ...payloadUser,
                profile: {
                    update: {
                        ...payloadProfile,
                    }
                }
            }
        })

        let response = ResponseFormatter(user, 'update user success', null, 200)
        res.status(200).json(response)
        return
    } catch (error) {
        let respons = ResponseFormatter(null, 'internal server error', error, 500)
        res.status(500).json(respons)
        return
    }
}

module.exports = {
    CreateUser,
    FetchUser,
    DeleteUser,
    UpdateUser,
    FetchAllUser
}