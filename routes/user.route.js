const express = require('express');
const router = express.Router();
const { Insert, GetById, Delete, Update, GetAll } = require('../controller/user.controller');
const { CheckUser } = require('../middleware/middleware');

/**
 * @swagger
 * /API/v1/user:
 *   post:
 *     tags:
 *       - user
 *     summary: Create a user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               identity_type:
 *                 type: string
 *               identity_number:
 *                 type: integer
 *               address:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Success
 *       '500':
 *         description: Internal server error
 */
router.post('/', CheckUser, Insert);

/**
 * @swagger
 * /API/v1/user/{id}:
 *   get:
 *     tags:
 *       - user
 *     summary: Get user by ID
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

/**
 * @swagger
 * /API/v1/user/{id}:
 *   put:
 *     tags:
 *       - user
 *     summary: Update user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               identity_type:
 *                 type: string
 *               identity_number:
 *                 type: integer
 *               address:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Success
 *       '500':
 *         description: Internal server error
 */
router.put('/:id', Update);

/**
 * @swagger
 * /API/v1/user/{id}:
 *   delete:
 *     tags:
 *       - user
 *     summary: Delete user by ID
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
router.delete('/:id', Delete);

/**
 * @swagger
 * /API/v1/user:
 *   get:
 *     tags:
 *       - user
 *     summary: Get all users
 *     responses:
 *       '200':
 *         description: Success
 *       '500':
 *         description: Internal server error
 */
router.get('/', GetAll);

module.exports = router;
