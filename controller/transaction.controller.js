const { ResponseFormatter, Pagination } = require('../helper/resp.helper')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function AddTransaction(req, res) {

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
                        let response = ResponseFormatter(null, 'the account is incorrect.', null, 400)
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
                        let response = ResponseFormatter(null, 'insufficient balance', null, 400)
                        res.status(400).json(response)
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
                                    increment: payload.amount
                                }
                            }
                        })

                        await prisma.bankAccount.update({
                            where: {
                                user_id: sourceAccount.user_id
                            },
                            data: {
                                balance: {
                                    decrement: payload.amount
                                }
                            }
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
                    let response = ResponseFormatter(null, 'Account not found', null, 404)
                    res.status(404).json(response)
                    return
            }
        }

    } catch (error) {
        let respons = ResponseFormatter(null, 'internal server error', error, 500);
        res.status(500).json(respons)
        return
    }
}

async function FetchAllHistoryTransaction(req, res) {

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

        const currentPage = parseInt(page) || 1
        const itemsPerPage = parseInt(perPage) || 10

        const totalCount = await prisma.transaction.count({
            where: payload,
        })

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
        let response = ResponseFormatter(transactions, 'fetch all history transaction is success', null, 200)
        res.status(200).json({ data: response, pagination })
        return
    } catch (error) {
        let response = ResponseFormatter(null, 'internal server error', error, 500)
        res.status(500).json(response)
        return
    }
}

async function FetchHistoryTransactionById(req, res) {

    const { id } = req.params

    try {
        const transactions = await prisma.transaction.findMany({
            where: {
                sourceAccount: {
                    user_id: parseInt(id),
                }
            },
            select: {
                source_account_id: true,
                amount: true,
                type_transaction: true,
                createdAt: true,
                destinationAccount: {
                    select: {
                        user_id: true,
                        bank_name: true,
                        bank_account_number: true
                    }
                }
            }
        }
        )

        if (!transactions) {
            let response = ResponseFormatter(null, 'transaction not found', null, 404)
            res.status(404).json(response)
            return

        } else {
            let response = ResponseFormatter(transactions, 'successfully retrieve the entire transaction history based on the source account id', null, 200)
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
    AddTransaction,
    FetchAllHistoryTransaction,
    FetchHistoryTransactionById
}