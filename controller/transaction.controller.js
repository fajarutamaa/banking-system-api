const { ResponseFormatter } = require('../helper/resp.helper')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function Insert(req, res) {

    const { source_account_id, destination_account_id, amount } = req.body

    const payload = {
        source_account_id: parseInt(source_account_id),
        destination_account_id: parseInt(destination_account_id),
        amount: parseInt(amount),
    }

    try {

        const sourceAccount = await prisma.bankAccount.findUnique({
            where: {
                id: parseInt(source_account_id),
            }
        })

        const destinationAccount = await prisma.bankAccount.findUnique({
            where: {
                id: parseInt(destination_account_id),
            }
        })     

        if (sourceAccount && destinationAccount) {

            const transaction = await prisma.transaction.create({
                data: payload,
            })

            const updateBalance = await prisma.bankAccount.update({
                where: {
                    id: parseInt(destination_account_id)
                },
                data: {
                    balance: parseInt(destinationAccount.balance) + parseInt(payload.amount),
                },
            })

            let respons = ResponseFormatter(transaction, 'transaction success', null, 200)
            res.json(respons)
            return

        } else {
            let respons = ResponseFormatter(null, 'id account not found', null, 404)
            res.json(respons)
            return
        }

    } catch (error) {
        let respons = ResponseFormatter(null, 'internal server error', error, 500)
        res.json(respons)
        return
    }
}

async function GetAll(req, res) {

    const { source_account_id, destination_account_id, amount } = req.query

    const payload = {}

    if (source_account_id) {
        payload.source_account_id = source_account_id
    }

    if (destination_account_id) {
        payload.destination_account_id = destination_account_id
    }

    if (amount) {
        payload.amount = amount
    }

    try {
        const transactions = await prisma.transaction.findMany({
            where: payload,
            orderBy: {
                id: 'asc'
            }
        })

        let respons = ResponseFormatter(transactions, 'fetch all history transaction is success', null, 200)
        res.json(respons)
        return
    } catch (error) {
        let respons = ResponseFormatter(null, 'internal server error', error, 500)
        res.json(respons)
        return
    }
}

async function GetById(req, res) {

    const { source_account_id } = req.params

    try {

        const transactions = await prisma.transaction.findMany({
            where: {
                id: source_account_id
            }
        })

        let respons = ResponseFormatter(transactions, 'fetch all history transaction by source account id is success', null, 200)
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
    GetAll,
    GetById
}
