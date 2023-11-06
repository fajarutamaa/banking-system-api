const express = require('express')
const router = express.Router()
const { Insert, GetAll, GetById } = require('../controller/transaction.controller')
const { CheckTransaction } = require('../middleware/middleware')

/**
 * @swagger
 * /API/v1/transaction:
 *   post:
 *     tags:
 *       - transaction
 *     summary: Create a user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               source_account_id :
 *                 type: integer
 *               destination_account_id:
 *                 type: integer
 *               amount:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Success
 *       '500':
 *         description: Internal server error
 */
router.post('/', CheckTransaction, Insert)

/**
 * @swagger
 * /API/v1/transaction:
 *   get:
 *     tags : 
 *      - transaction
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
 *      - transaction
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