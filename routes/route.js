const express = require('express')
const router = express.Router()
const morgan = require('morgan')
const userRoute = require('./user.route')
const accountRoute = require('./account.route')
const transactionRoute = require('./transaction.route')
const authRoute = require('../routes/auth.route')

router.use(morgan('dev'))

router.use('/users', userRoute)
router.use('/accounts', accountRoute)
router.use('/transactions', transactionRoute)
router.use('/auth', authRoute)

module.exports = router