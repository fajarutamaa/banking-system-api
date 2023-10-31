const express = require('express')
const router = express.Router()
const { Insert, GetById, Delete, Update, GetAll } = require('../controller/user.controller')
const { CheckProcess } = require('../middleware/middleware')

router.post('/', CheckProcess, Insert)

/**
 * @swagger
 * /API/v1/user/{id}:
 *   get:
 *     tags : 
 *      - "user"
 *     summary: example to get user by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: success
 *       500:
 *         description: internal server error
 */
router.get('/:id', GetById)

router.put('/:id', Update)
router.delete('/:id', Delete)

/**
 * @swagger
 * /API/v1/user:
 *   get:
 *     tags : 
 *      - "user"
 *     summary: example to get user
 *     responses:
 *       200:
 *         description: success
 *       500:
 *         description: internal server error
 */
router.get('/', GetAll)


module.exports = router