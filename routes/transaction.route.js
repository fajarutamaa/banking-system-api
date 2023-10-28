const express = require('express')
const router = express.Router()
const { Insert, GetAll } = require('../controller/transaction.controller')
const { CheckTransaction } = require('../middleware/middleware')

router.post('/', CheckTransaction, Insert)
router.get('/', GetAll)

module.exports = router