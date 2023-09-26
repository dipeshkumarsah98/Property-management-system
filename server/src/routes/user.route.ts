/* eslint-disable import/extensions */
import { Router } from 'express';
import { getUser, createUser } from 'controller/user.controller';
import { validate } from 'middleware/validate';
import validateToken from 'middleware/auth';

const router = Router();

/**
 *
 * @swagger
 * tags:
 *   name: Users
 *   description: The users manageing api
 *
 * /api/v1/users/:
 *  post:
 *    tags: [Users]
 *    summary: Creates a new user account.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateUser'
 *    responses:
 *      201:
 *        description: User account created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      400:
 *         $ref: '#/components/responses/BadRequest'
 *      500:
 *         $ref: '#/components/responses/ServerError'
 *
 */
router.post('/', validate('userSchema', 'createUser'), createUser);
/**
 * @swagger
 * /api/v1/users/{id}:
 *  get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Users]
 *     summary: Get particular user
 *     description: Get particular user
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id of a particular user
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetUserResponse'
 *       400:
 *          $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *          $ref: '#/components/responses/NotFound'
 *       500:
 *          $ref: '#/components/responses/ServerError'
 */
router.get('/:id', validateToken, getUser);

export default router;
