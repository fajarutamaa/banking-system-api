const express = require('express')
const router = express.Router()
const { Insert, GetById, Delete, Update, GetAll } = require('../controller/user.controller')
const { CheckProcess } = require('../middleware/middleware')

router.post('/', CheckProcess, Insert)
router.get('/:id', GetById)
router.put('/:id', Update)
router.delete('/:id', Delete)
router.get('/', GetAll)


module.exports = router