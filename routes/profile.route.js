const express = require('express')
const router = express.Router()
const { Insert } = require('../controller/profile.controller')
const { CheckProfile } = require('../middleware/middleware')

router.post('/', CheckProfile, Insert)

module.exports = router