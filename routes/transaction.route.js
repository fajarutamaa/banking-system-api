const express = require('express')
const router = express.Router()
const { Insert, GetAll, GetById } = require('../controller/transaction.controller')
const { CheckTransaction } = require('../middleware/middleware')

router.post('/', CheckTransaction, Insert)
router.get('/', GetAll)
router.get('/:id', GetById)

module.exports = router