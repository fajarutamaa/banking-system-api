const express = require('express');
const router = express.Router();
const { Insert, GetAll, GetById } = require('../controller/account.controller');
const { CheckAccount } = require('../middleware/middleware');

/**
 * @swagger
 * /API/v1/account:
 *   post:
 *     tags:
 *       - account
 *     summary: Create an account
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               bank_name:
 *                 type: string
 *               bank_account_number:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Success
 *       '500':
 *         description: Internal server error
 */
router.post('/', CheckAccount, Insert);

/**
 * @swagger
 * /API/v1/account:
 *   get:
 *     tags:
 *      - account
 *     summary: Get all user accounts
 *     responses:
 *       '200':
 *         description: Success
 *       '500':
 *         description: Internal server error
 */
router.get('/', GetAll);

/**
 * @swagger
 * /API/v1/account/{id}:
 *   get:
 *     tags:
 *      - account
 *     summary: Get a user account by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Success
 *       '500':
 *         description: Internal server error
 */
router.get('/:id', GetById);

module.exports = router;
