// creating useable error response
/**
 * @swagger
 * components:
 *   responses:
 *     NotFound:
 *       description: Not found
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: number
 *                  default: 404
 *                success:
 *                  type: boolean
 *                  default: false
 *                message:
 *                  type: string
 *                  default: Not found
 *                payload:
 *                  type: object
 *                  properties:
 *                    status:
 *                      type: number
 *                      default: 404
 *                    data:
 *                      type: object
 *                      properties:
 *                        code:
 *                          type: string
 *                          default: NOT FOUND
 *                        details:
 *                          type: string
 *                          default: Not found
 *     ServerError:
 *       description: Internal Server Error
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: number
 *                  default: 500
 *                success:
 *                  type: boolean
 *                  default: false
 *                message:
 *                  type: string
 *                  default: Internal Server Error
 *                payload:
 *                  type: object
 *                  properties:
 *                    status:
 *                      type: number
 *                      default: Internal Server Error
 *                    data:
 *                      type: object
 *                      properties:
 *                        code:
 *                          type: string
 *                          default: INTERNAL SERVER ERROR
 *                        details:
 *                          type: string
 *                          default: Something went wrong with the server
 *     BadRequest:
 *       description: Bad Request
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: number
 *                  default: 400
 *                success:
 *                  type: boolean
 *                  default: false
 *                message:
 *                  type: string
 *                  default: Bad Request
 *                payload:
 *                  type: object
 *                  properties:
 *                    status:
 *                      type: number
 *                      default: 400
 *                    data:
 *                      type: object
 *                      properties:
 *                        code:
 *                          type: string
 *                          default: VALIDATION ERROR
 *                        details:
 *                          type: string
 *                          default: Some required field are not passed or invaid datatype passed
 *     Unauthorized:
 *       description: Unauthorized
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: number
 *                  default: 401
 *                success:
 *                  type: boolean
 *                  default: false
 *                message:
 *                  type: string
 *                  default: Incorrect API key or incorrect format
 *                payload:
 *                  type: object
 *                  properties:
 *                    status:
 *                      type: number
 *                      default: 401
 *                    data:
 *                      type: object
 *                      properties:
 *                        code:
 *                          type: string
 *                          default: UNAUTHORIZED
 *                        details:
 *                          type: string
 *                          default: Incorrect API key or incorrect format
 *
 *
 */
