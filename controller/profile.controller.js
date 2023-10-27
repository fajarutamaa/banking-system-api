const { ResponseFormatter } = require('../helper/resp.helper')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function Insert(req, res) {

    const { user_id, identity_type, identity_number, address } = req.body
    console.log(req.body)

    const payload = {
        user_id : parseInt(user_id),
        identity_type,
        identity_number : parseInt(identity_number),
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



module.exports = {
    Insert,
}