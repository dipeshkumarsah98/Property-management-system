import { Router } from 'express';
import { loginUser, refreshToken } from 'controller/auth.contoller';
import { validate } from 'middleware/validate';

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The Auth managing api
 * /api/v1/auth/login:
 *   post:
 *     summary: Authenticates a user by verifying their credentials and generating an access token.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUser'
 *     responses:
 *       200:
 *         description: Returns the access token and other relevant user information.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/LoginUserResponse'
 *       400:
 *          $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#components/responses/NotFound'
 *       500:
 *         $ref: '#components/responses/ServerError'
 *
 */
router.post('/login', validate('authSchema', 'login'), loginUser);
/**
 * @swagger
 * /api/v1/auth/refresh:
 *   post:
 *     summary: Generates a new access token using a refresh token.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshLoginUser'
 *     responses:
 *       200:
 *         description: Returns a new access token.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/RefreshLoginUserResponse'
 *       400:
 *         $ref: '#components/responses/BadRequest'
 *       500:
 *         $ref: '#components/responses/ServerError'
 */
router.post('/refresh', validate('authSchema', 'refreshToken'), refreshToken);

export default router;
