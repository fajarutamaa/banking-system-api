const { ResponseFormatter } = require('../helper/resp.helper')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function Insert(req, res) {

    const { user_id, identity_type, identity_number, address } = req.body

    const payload = {
        user_id: parseInt(user_id),
        identity_type,
        identity_number: parseInt(identity_number),
        address,
    }

    try {
        const profile = await prisma.profile.create({
            data: payload,
        })

        let respons = ResponseFormatter(profile, 'success', null, 200)
        res.json(respons)
        return
    } catch (error) {
        let respons = ResponseFormatter(null, 'internal server error', error, 500)
        res.json(respons)
        return
    }
}

async function GetAll(req, res) {

    const { user_id, identity_type, identity_number, address } = req.query

    const payload = {}

    if (user_id) {
        payload.user_id = user_id
    }

    if (identity_type) {
        payload.identity_type = identity_type
    }

    if (identity_number) {
        payload.identity_number = identity_number
    }

    if (address) {
        payload.address = address
    }

    try {
        const profiles = await prisma.profile.findMany({
            where: payload,
            orderBy: {
                id: 'asc'
            }
        })

        let respons = ResponseFormatter(profiles, 'success', null, 200)
        res.json(respons)
        return
    } catch (error) {
        let respons = ResponseFormatter(null, 'internal server error', error, 500)
        req.json(respons)
        return
    }

}



module.exports = {
    Insert,
    GetAll
}