const express = require('express')
const router = express.Router()
const { Insert, GetById, Delete, Update } = require('../controller/user.controller')
const { CheckProcess } = require('../middleware/middleware')

// router.get('/', Get)
router.post('/', CheckProcess, Insert)
router.get('/:id', GetById)
router.put('/:id', Update)
router.delete('/:id', Delete)


module.exports = router