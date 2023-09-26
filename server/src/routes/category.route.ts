import { Router } from 'express';
import * as categoryController from 'controller/category.controller';
import { validate } from 'middleware/validate';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: The Category manageing api
 *
 * /api/v1/categories:
 *  get:
 *     tags: [Categories]
 *     summary: Get all category
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetAllCategoryResponse'
 *       404:
 *          $ref: '#/components/responses/NotFound'
 *       500:
 *          $ref: '#/components/responses/ServerError'
 */
router.get('/', categoryController.getAllCategory);

/**
 * @swagger
 * /api/v1/categories:
 *  post:
 *    tags: [Categories]
 *    summary: Creates a new category
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateCategory'
 *    responses:
 *      201:
 *        description: New Arrival Product created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateNewCategoryResponse'
 *      400:
 *         $ref: '#/components/responses/BadRequest'
 *      500:
 *         $ref: '#/components/responses/ServerError'
 *
 */
router.post(
  '/',
  validate('categorySchema', 'createCategory'),
  categoryController.createCategory
);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *  patch:
 *     tags: [Categories]
 *     summary: update particular category
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id of a product
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategory'
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateCategoryResponse'
 *       400:
 *          $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *          $ref: '#/components/responses/NotFound'
 *       500:
 *          $ref: '#/components/responses/ServerError'
 */
router.patch(
  '/:id',
  validate('categorySchema', 'createCategory'),
  categoryController.updateCategory
);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *  delete:
 *     tags: [Categories]
 *     summary: Delete particular category
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id of a category
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeletetCategoryResponse'
 *       400:
 *          $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *          $ref: '#/components/responses/NotFound'
 *       500:
 *          $ref: '#/components/responses/ServerError'
 */
router.delete('/:id', categoryController.deleteCategory);

export default router;
