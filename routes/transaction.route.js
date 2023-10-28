const express = require('express')
const router = express.Router()
const { Insert } = require('../controller/transaction.controller')
const { CheckTransaction } = require('../middleware/middleware')


router.post('/', CheckTransaction, Insert)


module.exports = router