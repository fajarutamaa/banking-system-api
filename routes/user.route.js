const router = require('express').Router()
const { Get } = require('../controller/user.controller')

router.get('/', Get)


module.exports = router