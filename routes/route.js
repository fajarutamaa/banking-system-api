const express = require('express')
const router = express.Router()
const morgan = require('morgan')
const userRoute = require('./user.route')
const accountRoute = require('./account.route')
const transactionRoute = require('./transaction.route')

router.use(morgan('dev'))

router.use('/user', userRoute)
router.use('/account', accountRoute)
router.use('/transaction', transactionRoute)

module.exports = router