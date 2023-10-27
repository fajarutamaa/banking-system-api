const express = require('express')
const router = express.Router()
const { Insert } = require('../controller/account.controller')
const {  CheckAccount } = require('../middleware/middleware')

router.post('/', CheckAccount, Insert)

module.exports = router