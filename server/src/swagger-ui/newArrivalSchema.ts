/**
 * @swagger
 * components:
 *   schemas:
 *     CreateNewArrival:
 *       type: object
 *       required:
 *         - product_id
 *       properties:
 *         product_id:
 *           type: integer
 *           description: The Product id which is going to be in new arrivals
 *       example:
 *         product_id: 2
 *     CreateNewArrivalResponse:
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
 *                 product_id:
 *                   type: integer
 *                 created_at:
 *                   type: string
 *                 updated_at:
 *                   type: string
 *     GetAllNewArrivalsResponse:
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
 *                   product_id:
 *                     type: integer
 *                     default: 2
 *                   created_at:
 *                     type: string
 *                   updated_at:
 *                     type: string
 *     UpdateNewArrivalResponse:
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
 *                 product_id:
 *                   type: integer
 *                   default: 2
 *                 created_at:
 *                   type: string
 *                 updated_at:
 *                   type: string
 *     DeleteNewArrivalResponse:
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
 *                   default: Product deleted successfully
 *
 */
