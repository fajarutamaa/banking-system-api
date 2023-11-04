const express = require('express')
const router = express.Router()
const { Insert, GetById, Delete, Update, GetAll } = require('../controller/user.controller')
const { CheckUser } = require('../middleware/middleware')

router.post('/', CheckUser, Insert)
router.get('/:id', GetById)
router.put('/:id', Update)
router.delete('/:id', Delete)
router.get('/', GetAll)


module.exports = router