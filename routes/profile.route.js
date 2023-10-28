const express = require('express')
const router = express.Router()
const { Insert, GetAll } = require('../controller/profile.controller')
const { CheckProfile } = require('../middleware/middleware')

router.post('/', CheckProfile, Insert)
router.get('/', GetAll)

module.exports = router