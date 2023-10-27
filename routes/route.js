const express = require('express')
const { ResponseFormatter } = require('../helper/resp.helper')
const router = express.Router()
const morgan = require('morgan')
const userRoute = require('./user.route')
const profileRoute = require('./profile.route')
const accountRoute = require('./account.route')



router.use(morgan('dev'))


router.get('/ping', (req, res) => {
    let resp = ResponseFormatter('pong', 'success', null, 200)
    return res.json(resp)
})

router.use('/user', userRoute)
router.use('/profile', profileRoute)
router.use('/account', accountRoute)
//router.use('/transaction',)

module.exports = router