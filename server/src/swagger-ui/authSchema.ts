/**
 * @openapi
 * components:
 *   schemas:
 *     LoginUser:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         uuid:
 *           type: uuid
 *           description: The auto-genereated uuid for the Login
 *         email:
 *           type: string
 *           description: The unique email for login
 *         password:
 *           type: string
 *           description: Password for login
 *       example:
 *         email: example@gmail.com
 *         password: abcd@123
 *     LoginUserResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         status:
 *           type: integer
 *           default: 200
 *         message:
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
 *                 access:
 *                   type: string
 *                 refresh:
 *                   type: string
 *     RefreshLoginUser:
 *       type: object
 *       required:
 *         - token
 *       properties:
 *         token:
 *           type: string
 *           description: Refresh token
 *       example:
 *         token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxQGdtYWlsLmNvbSIsInV1aWQiOiJhZjA5YjY4NS1lZGU0LTRjMjItYmVjZC0zZjUxMGRkMmNmYzciLCJpYXQiOjE2ODY1NDcxNDcsImV4cCI6MTY4NjU2ODc0N30.9rNWF9VPJMRy8du2yig45jHbsfS33Ww1vlyxbVWoBKY
 *     RefreshLoginUserResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         status:
 *           type: integer
 *           default: 200
 *         message:
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
 *                 access:
 *                   type: string
 *                 refresh:
 *                   type: string
 *   */
