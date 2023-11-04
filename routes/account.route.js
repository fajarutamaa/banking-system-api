const express = require('express')
const router = express.Router()
const { Insert, GetAll, GetById } = require('../controller/account.controller')
const { CheckAccount } = require('../middleware/middleware')

router.post('/', CheckAccount, Insert)

/**
 * @swagger
 * /API/v1/account:
 *   get:
 *     tags : 
 *      - "account"
 *     summary: example to get user account
 *     responses:
 *       200:
 *         description: success
 *       500:
 *         description: internal server error
 */
router.get('/', GetAll)

/**
 * @swagger
 * /API/v1/account/{id}:
 *   get:
 *     tags : 
 *      - "account"
 *     summary: example to get user account by id
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

module.exports = router