const { ResponseFormatter, Pagination } = require('../helper/resp.helper')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function Insert(req, res) {

    const minBalance = 25000
    const { source_account_id, destination_account_id, amount, type_transaction } = req.body
    const { balance } = req.params

    const payload = {
        source_account_id: parseInt(source_account_id),
        destination_account_id: parseInt(destination_account_id),
        amount: parseInt(amount),
        type_transaction
    }

    try {
        const sourceAccount = await prisma.bankAccount.findUnique({
            where: {
                user_id: payload.source_account_id,
            }
        })

        const destinationAccount = await prisma.bankAccount.findUnique({
            where: {
                user_id: payload.destination_account_id,
            }
        })

        const checkBalance = await prisma.bankAccount.findFirst({
            where: {
                balance: balance,
            }
        })

        console.log(type_transaction)

        if (sourceAccount && destinationAccount) {
            switch (type_transaction) {

                case 'Deposit':
                    if (sourceAccount.user_id == destinationAccount.user_id) {

                        const deposit = await prisma.transaction.create({
                            data: payload,
                        })

                        await prisma.bankAccount.update({
                            where: {
                                user_id: payload.destination_account_id,
                            },
                            data: {
                                balance: destinationAccount.balance + payload.amount,
                            }
                        })

                        let response = ResponseFormatter(deposit, 'transaction success', null, 200)
                        res.status(200).json(response)
                        return
                    } else {
                        let response = ResponseFormatter(null, 'account is wrong', null, 400)
                        res.status(400).json(response)
                        return
                    }


                case 'Withdraw':
                    if (checkBalance >= amount && sourceAccount.user_id == destinationAccount.user_id) {
                        const withdraw = await prisma.transaction.create({
                            data: payload,
                        })

                        await prisma.bankAccount.update({
                            where: {
                                user_id: payload.destination_account_id,
                            },
                            data: {
                                balance: destinationAccount.balance - payload.amount,
                                balance: sourceAccount.balance - payload.amount,
                            }
                        })
                        let response = ResponseFormatter(withdraw, 'transaction success', null, 200)
                        res.status(200).json(response)
                        return
                    } else {
                        let response = ResponseFormatter(null, 'balance Low', null, 404)
                        res.status(404).json(response)
                        return
                    }

                case 'Transfer':
                    if (amount <= checkBalance && checkBalance != 0 && sourceAccount.user_id != destinationAccount.user_id) {

                        const transfer = await prisma.transaction.create({
                            data: payload,
                        })

                        await prisma.bankAccount.update({
                            where: {
                                user_id: destinationAccount.user_id,
                            },
                            data: {
                                balance: {
                                    increment: payload.amount,
                                },
                            },
                        })


                        await prisma.bankAccount.update({
                            where: {
                                user_id: sourceAccount.user_id,
                            },
                            data: {
                                balance: {
                                    decrement: payload.amount,
                                },
                            },
                        })

                        let response = ResponseFormatter(transfer, 'transaction success', null, 200)
                        res.status(200).json(response)
                        return
                    } else {
                        let response = ResponseFormatter(null, 'balance low and destination account is wrong', null, 404)
                        res.status(404).json(response)
                        return

                    }

                default:
                    let respone = ResponseFormatter(null, 'Account not found', null, 404)
                    res.status(404).json(response)
                    return
                    break
            }
        }

    } catch (error) {
        console.log(error)
        let respons = ResponseFormatter(null, 'Internal server error', error, 500)
        res.status(500).json(respons)
        return
    }
}

async function GetAll(req, res) {

    const { source_account_id, destination_account_id, amount, page, perPage } = req.query

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

        const totalCount = await prisma.transaction.count({
            where: payload,
        })

        const currentPage = parseInt(page) || 1
        const itemsPerPage = parseInt(perPage) || 10

        const transactions = await prisma.transaction.findMany({
            where: payload,
            orderBy: {
                id: 'asc'
            },
            skip: (currentPage - 1) * itemsPerPage,
            take: itemsPerPage,
        })

        const totalPages = Math.ceil(totalCount / itemsPerPage)

        let pagination = Pagination(currentPage, totalCount, totalPages)
        let respons = ResponseFormatter(transactions, 'fetch all history transaction is success', null, 200)
        res.status(200).json({ data: respons, pagination })
        return
    } catch (error) {
        console.log(error)
        let respons = ResponseFormatter(null, 'internal server error', error, 500)
        res.status(500).json(respons)
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