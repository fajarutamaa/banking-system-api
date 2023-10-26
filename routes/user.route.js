const express = require('express')
const router = express.Router()
const { Insert } = require('../controller/user.controller')
const { CheckProcess } = require('../middleware/middleware')

// router.get('/', Get)
router.post('/', CheckProcess, Insert)


module.exports = router