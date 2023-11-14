const { ResponseFormatter, Pagination } = require('../helper/resp.helper')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function CreateAccount(req, res) {

    const { user_id, bank_name, bank_account_number } = req.body

    const payload = {
        user_id: parseInt(user_id),
        bank_name,
        bank_account_number: parseInt(bank_account_number)
    }

    try {
        const account = await prisma.bankAccount.create({
            data: payload
        })

        let response = ResponseFormatter(account, 'account creation is successful', null, 200)
        res.status(200).json(response)
        return
    } catch (error) {
        let response = ResponseFormatter(null, 'internal server error', error, 500)
        res.status(500).json(response)
        return
    }
}

async function FetchAllAccount(req, res) {

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

        const currentPage = parseInt(page) || 1
        const itemsPerPage = parseInt(perPage) || 10

        const totalCount = await prisma.bankAccount.count({
            where: payload
        })

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
        let response = ResponseFormatter(accounts, 'fetch all account is success', null, 200)
        res.status(200).json({ data: response, pagination })
        return
    } catch (error) {
        let response = ResponseFormatter(null, 'internal server error', error, 500)
        res.status(500).json(response)
        return
    }
}

async function FetchAccount(req, res) {

    const { id } = req.params

    try {

        const checkAccount = await prisma.bankAccount.findUnique({
            where: {
                user_id: parseInt(id)
            }
        })

        if (!checkAccount) {
            let response = ResponseFormatter(null, 'id account not found', null, 404)
            res.status(404).json(response)
            return
        } else {
            const accounts = await prisma.bankAccount.findUnique({
                where: {
                    user_id: parseInt(id)
                }
            })

            let response = ResponseFormatter(accounts, 'fetch account by id is success', null, 200)
            res.status(200).json(response)
            return
        }
    } catch (error) {
        let response = ResponseFormatter(null, 'internal server error', error, 500)
        res.status(500).json(response)
        return
    }
}

module.exports = {
    CreateAccount,
    FetchAllAccount,
    FetchAccount
}