const { ResponseFormatter, Pagination } = require('../helper/resp.helper')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function Insert(req, res) {

    const { user_id, bank_name, bank_account_number } = req.body

    const payload = {
        user_id: parseInt(user_id),
        bank_name,
        bank_account_number: parseInt(bank_account_number),
    }

    try {
        const account = await prisma.bankAccount.create({
            data: payload,
        })

        let respons = ResponseFormatter(account, 'create account is success', null, 200)
        res.status(200).json(respons)
        return
    } catch (error) {
        let respons = ResponseFormatter(null, 'internal server error', error, 500)
        res.status(500).json(respons)
        return
    }
}

async function GetAll(req, res) {

    const { user_id, bank_name, bank_account_number, page, perPage } = req.query

    const payload = {}

    if (user_id) {
        payload.user_id = user_id
    }

    if (bank_name) {
        payload.bank_name = bank_name
    }

    if (bank_account_number) {
        payload.bank_account_number = bank_account_number
    }

    try {

        const totalCount = await prisma.bankAccount.count({
            where: payload,
        })

        const currentPage = parseInt(page) || 1
        const itemsPerPage = parseInt(perPage) || 10

        const accounts = await prisma.bankAccount.findMany({
            where: payload,
            orderBy: {
                id: 'asc'
            },
            skip: (currentPage - 1) * itemsPerPage,
            take: itemsPerPage,
        })

        const totalPages = Math.ceil(totalCount / itemsPerPage)

        let pagination = Pagination(currentPage, totalCount, totalPages)
        let respons = ResponseFormatter(accounts, 'fetch all account is success', null, 200)
        res.status(200).json({ data: respons, pagination })
        return
    } catch (error) {
        let respons = ResponseFormatter(null, 'internal server error', error, 500)
        res.status(500).json(respons)
        return
    }

}

async function GetById(req, res) {

    const { id } = req.params

    try {
        const accounts = await prisma.bankAccount.findUnique({
            where: {
                id: parseInt(id),
            }
        })

        let respons = ResponseFormatter(accounts, 'fetch account by id is success', null, 200)
        res.status(200).json(respons)
        return
    } catch (error) {
        let respons = ResponseFormatter(null, 'internal server error', error, 500)
        res.status(500).json(respons)
        return
    }
}

module.exports = {
    Insert,
    GetAll,
    GetById
}