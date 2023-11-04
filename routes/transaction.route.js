const express = require('express')
const router = express.Router()
const { Insert, GetAll, GetById } = require('../controller/transaction.controller')
const { CheckTransaction } = require('../middleware/middleware')

router.post('/', CheckTransaction, Insert)

/**
 * @swagger
 * /API/v1/transaction:
 *   get:
 *     tags : 
 *      - "transaction"
 *     summary: Example to get history transaction
 *     responses:
 *       200:
 *         description: success
 *       500:
 *         description: internal server error
 */
router.get('/', GetAll)

/**
 * @swagger
 * /API/v1/transaction/{id}:
 *   get:
 *     tags : 
 *      - "transaction"
 *     summary: Example to get all history transaction by id
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