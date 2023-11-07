const { ResponseFormatter, Pagination } = require('../helper/resp.helper')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function Insert(req, res) {

    const { source_account_id, destination_account_id, amount } = req.body;

    const payload = {
        source_account_id: parseInt(source_account_id),
        destination_account_id: parseInt(destination_account_id),
        amount: parseInt(amount),
    }

    try {
<<<<<<< HEAD
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

        if (!sourceAccount && !destinationAccount) {
            let respons = ResponseFormatter(null, 'Account not found', null, 404);
            res.status(404).json(respons)
            return
        } else {
            const transaction = await prisma.transaction.create({
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
            let respons = ResponseFormatter(transaction, 'transaction success', null, 200);
            res.status(200).json(respons)
            return
        }
=======

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

>>>>>>> main
    } catch (error) {
        let respons = ResponseFormatter(null, 'internal server error', error, 500);
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

<<<<<<< HEAD
        const currentPage = parseInt(page) || 1
        const itemsPerPage = parseInt(perPage) || 10

=======
>>>>>>> main
        const totalCount = await prisma.transaction.count({
            where: payload,
        })

<<<<<<< HEAD
=======
        const currentPage = parseInt(page) || 1
        const itemsPerPage = parseInt(perPage) || 10

>>>>>>> main
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
<<<<<<< HEAD
        res.status(200).json({ data: respons, pagination })
=======
        res.json({ data: respons, pagination })
>>>>>>> main
        return
    } catch (error) {
        console.log(error)
        let respons = ResponseFormatter(null, 'internal server error', error, 500)
        res.status(500).json(respons)
        return
    }
}

async function GetById(req, res) {

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
                createdAt: true,
                destinationAccount: {
                    select: {
                        user_id: true,
                        bank_name: true,
                        bank_account_number: true
                    }
                },
            }
        }
        )

        if (!transactions) {
            let respons = ResponseFormatter(null, 'transaction not found', null, 404)
            res.status(404).json(respons)
            return

        } else {
            let respons = ResponseFormatter(transactions, 'fetch all history transaction by source account id is success', null, 200)
            res.status(200).json(respons)
            return
        }

<<<<<<< HEAD
=======
        let respons = ResponseFormatter(transactions, 'fetch all history transaction by source account id is success', null, 200)
        res.json(respons)
        return
>>>>>>> main
    } catch (error) {
        console.log(error)
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