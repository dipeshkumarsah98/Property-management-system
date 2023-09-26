/**
 * @swagger
 * components:
 *   schemas:
 *     CreateCategory:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto generated id for product
 *         name:
 *           type: string
 *           description: Name of the product
 *       example:
 *         name: new_arrival
 *     CreateNewCategoryResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         status:
 *           type: integer
 *           default: 201
 *         type:
 *           type: string
 *           default: Created
 *         payload:
 *           type: object
 *           properties:
 *             status:
 *               type: number
 *               default: 201
 *             data:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   default: 1
 *                 name:
 *                   type: string
 *                   default: Top
 *                 created_at:
 *                   type: string
 *                   default: 2023-08-06T06:55:56.386Z
 *                 updated_at:
 *                   type: string
 *                   default: 2023-08-06T06:55:56.386Z
 *     GetCategoryResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         status:
 *           type: integer
 *           default: 200
 *         type:
 *           type: string
 *           default: OK
 *         payload:
 *           type: object
 *           properties:
 *             status:
 *               type: number
 *               default: 200
 *             data:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   default: 1
 *                 name:
 *                   type: string
 *                   default: Top
 *                 created_at:
 *                   type: string
 *                   default: 2023-08-06T06:55:56.386Z
 *                 updated_at:
 *                   type: string
 *                   default: 2023-08-06T06:55:56.386Z
 *     GetAllCategoryResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         status:
 *           type: integer
 *           default: 200
 *         type:
 *           type: string
 *           default: Ok
 *         payload:
 *           type: object
 *           properties:
 *             status:
 *               type: number
 *               default: 200
 *             data:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     default: 1
 *                   name:
 *                     type: string
 *                     default: Top
 *                   created_at:
 *                     type: string
 *                     default: 2023-08-06T06:55:56.386Z
 *                   updated_at:
 *                     type: string
 *                     default: 2023-08-06T06:55:56.386Z
 *     UpdateProductResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         status:
 *           type: integer
 *           default: 200
 *         type:
 *           type: string
 *           default: Ok
 *         payload:
 *           type: object
 *           properties:
 *             status:
 *               type: number
 *               default: 200
 *             data:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   default: 1
 *                 name:
 *                   type: string
 *                   default: Top
 *                 created_at:
 *                   type: string
 *                   default: 2023-08-06T06:55:56.386Z
 *                 updated_at:
 *                   type: string
 *                   default: 2023-09-06T06:55:56.386Z
 *     DeleteProductResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         status:
 *           type: integer
 *           default: 200
 *         type:
 *           type: string
 *           default: Ok
 *         payload:
 *           type: object
 *           properties:
 *             status:
 *               type: number
 *               default: 200
 *             data:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   default: Category deleted successfully
 *
 */
