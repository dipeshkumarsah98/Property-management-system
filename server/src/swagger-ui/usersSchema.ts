/**
 * @swagger
 * components:
 *   schemas:
 *     CreateUser:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *         - dob
 *         - contact
 *       properties:
 *         uuid:
 *           type: uuid
 *           description: The auto generated uuid for user
 *         firstName:
 *           type: string
 *           description: User first name
 *         lastName:
 *           type: string
 *           description: User last name
 *         email:
 *           type: string
 *           description: User unique email
 *         password:
 *           type: string
 *           description: User password
 *         dob:
 *           type: date
 *           description: User date of birth
 *         contact:
 *           type: string
 *           description: User phone number
 *       example:
 *         firstName: test
 *         lastName: test2
 *         email: test6@gmail.com
 *         password: test6@123
 *         dob: 10-12-2010
 *         contact: '9808912345'
 *     CreateUserResponse:
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
 *                 uuid:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 email:
 *                   type: string
 *     GetUserResponse:
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
 *                 uuid:
 *                   type: string
 *                   default: 7083f229-06be-4516-b85c-b2282ae3541a
 *                 login_id:
 *                   type: integer
 *                   default: 1
 *                 first_name:
 *                   type: string
 *                   default: John
 *                 last_name:
 *                   type: string
 *                   default: wick
 *                 phone_number:
 *                   type: string
 *                   default: 980898212345
 *                 date_of_birth:
 *                   type: string
 *                   default: 2010-10-12
 *                 created_at:
 *                   type: string
 *                 updated_at:
 *                   type: string
 *
 */
