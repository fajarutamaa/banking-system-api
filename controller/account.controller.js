const { ResponseFormatter } = require('../helper/resp.helper')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


async function Insert(req, res) {

    const { user_id, bank_name, bank_account_number } = req.body
    console.log(req.body)

    const payload = {
        user_id: parseInt(user_id),
        bank_name,
        bank_account_number: parseInt(bank_account_number),
    }

    try {
        const account = await prisma.bankAccount.create({
            data: payload,
        })

        let respons = ResponseFormatter(account, 'success', null, 200)
        res.json(respons)
        return
    } catch (error) {
        let respons = ResponseFormatter(null, 'internal server error', error, 500)
        res.json(respons)
        return
    }
}

async function GetAll(req, res) {

    const { user_id, bank_name, bank_account_number } = req.query

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
        const accounts = await prisma.bankAccount.findMany({
            where: payload,
            orderBy: {
                id: 'asc'
            }
        })

        let respons = ResponseFormatter(accounts, 'success', null, 200)
        res.json(respons)
        return
    } catch (error) {
        let respons = ResponseFormatter(null, 'internal server error', error, 500)
        res.json(respons)
        return
    }

}

async function GetById(req, res) {

    const { user_id } = req.params

    try {
        const accounts = await prisma.bankAccount.findMany({
            where: {
                id: user_id
            }
        })

        let respons = ResponseFormatter(accounts, 'success', null, 200)
        res.json(respons)
        return
    } catch(error){
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
