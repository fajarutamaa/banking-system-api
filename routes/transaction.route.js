const express = require('express')
const router = express.Router()
const { AddTransaction, FetchAllHistoryTransaction, FetchHistoryTransactionById } = require('../controller/transaction.controller')
const { CheckTransaction } = require('../middleware/middleware')

/**
 * @swagger
 * /API/v1/transactions:
 *   post:
 *     tags:
 *       - transaction
 *     summary: Add new transaction
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
 *               type_transaction:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Success
 *       '500':
 *         description: Internal server error
 */
router.post('/', CheckTransaction, AddTransaction)

/**
 * @swagger
 * /API/v1/transactions:
 *   get:
 *     tags : 
 *      - transaction
 *     summary: Example to fetch all history transactions
 *     responses:
 *       200:
 *         description: success
 *       500:
 *         description: internal server error
 */
router.get('/', FetchAllHistoryTransaction)

/**
 * @swagger
 * /API/v1/transactions/{id}:
 *   get:
 *     tags : 
 *      - transaction
 *     summary: Example to fetch all history transactions by source account id
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
router.get('/:id', FetchHistoryTransactionById)

module.exports = router