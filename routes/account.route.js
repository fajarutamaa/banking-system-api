const express = require('express')
const router = express.Router()
const { Insert, GetAll, GetById } = require('../controller/account.controller')
const { CheckAccount } = require('../middleware/middleware')

router.post('/', CheckAccount, Insert)
router.get('/', GetAll)
router.get('/:id', GetById)

module.exports = router