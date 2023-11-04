const express = require('express')
const router = express.Router()
const { Insert, GetById, Delete, Update, GetAll } = require('../controller/user.controller')
const { CheckUser } = require('../middleware/middleware')


/**
 * @swagger
 * /API/v1/user:
 *   post:
 *     tags:
 *       - "user"
 *     summary: Example to create a user 
 *     parameters:
 *       - in: body
 *         name: user
 *         required: true
 *         description: The user data
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal server error
 */
router.post('/', CheckUser, Insert)

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