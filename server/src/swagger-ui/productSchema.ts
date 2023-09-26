/**
 * @swagger
 * components:
 *   schemas:
 *     CreateProduct:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - material
 *         - color
 *         - image
 *         - price
 *         - available_stock
 *         - size
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto generated id for product
 *         uuid:
 *           type: string
 *           description: The auto generated uuid for product
 *         name:
 *           type: string
 *           description: Name of the product
 *         material:
 *           type: string
 *           description: cotton
 *         description:
 *           type: string
 *           description: Description of the product
 *         color:
 *           type: array
 *           description: Array of product colors
 *         image:
 *           type: array
 *           description: Array of Image
 *         price:
 *           type: integer
 *           description: Price of the product
 *         available_stock:
 *           type: integer
 *           description: No of available stocks of the product
 *         size:
 *           type: array
 *           description: Array of availabe size of the product
 *       example:
 *         name: Top
 *         description: Fiber cloth top
 *         color: ["blue", "green"]
 *         image: ["https:abcd.com"]
 *         price: 20
 *         available_stock: 5
 *         size: ["XS", "LG", "XL"]
 *     CreateNewProductResponse:
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
 *                 uuid:
 *                   type: string
 *                   default: c407a7bd-7930-43bc-a424-12aafd058ed3
 *                 name:
 *                   type: string
 *                   default: Top
 *                 material:
 *                   type: string
 *                   default: cotton
 *                 description:
 *                   type: string
 *                   default: Beautiful top
 *                 color:
 *                   type: array
 *                   items:
 *                     type: string
 *                     default:  "orange"
 *                 image:
 *                   type: array
 *                   items:
 *                     type: string
 *                     default:  "www.myimage.com"
 *                 size:
 *                   type: array
 *                   items:
 *                     type: string
 *                     default:  "XS"
 *                 price:
 *                   type: integer
 *                   default: 9
 *                 available_stock:
 *                   type: integer
 *                   default: 5
 *                 created_at:
 *                   type: string
 *                   default: 2023-08-06T06:55:56.386Z
 *                 updated_at:
 *                   type: string
 *                   default: 2023-08-06T06:55:56.386Z
 *     GetProductResponse:
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
 *                 uuid:
 *                   type: string
 *                   default: c407a7bd-7930-43bc-a424-12aafd058ed3
 *                 name:
 *                   type: string
 *                   default: Top
 *                 description:
 *                   type: string
 *                   default: Free size top availabe
 *                 color:
 *                   type: string
 *                   default: ["blue", "red"]
 *                 image:
 *                   type: string
 *                   default: ["www.myimage.com", "www.myimage.com"]
 *                 size:
 *                   type: string
 *                   default: ["XL", "LG"]
 *                 price:
 *                   type: integer
 *                   default: 19
 *                 material:
 *                   type: string
 *                   default: cotton
 *                 available_stock:
 *                   type: integer
 *                   default: 10
 *                 created_at:
 *                   type: string
 *                   default: 2023-08-06T06:55:56.386Z
 *                 updated_at:
 *                   type: string
 *                   default: 2023-08-06T06:55:56.386Z
 *                 category:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       default: 3
 *                     name:
 *                       type: string
 *                       default: new_arrival
 *     GetAllProductResponse:
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
 *                   uuid:
 *                     type: string
 *                     default: c407a7bd-7930-43bc-a424-12aafd058ed3
 *                   name:
 *                     type: string
 *                     default: Top
 *                   material:
 *                     type: string
 *                     default: cotton
 *                   description:
 *                     type: string
 *                     default: A flexible top
 *                   image:
 *                     type: array
 *                     items:
 *                       type: string
 *                       default: "www.myimage.com"
 *                   size:
 *                     type: array
 *                     items:
 *                       type: string
 *                       default: XL
 *                   color:
 *                     type: array
 *                     items:
 *                       type: string
 *                       default: blue
 *                   price:
 *                     type: integer
 *                     default: 10
 *                   available_stock:
 *                     type: integer
 *                     default: 5
 *                   created_at:
 *                     type: string
 *                     default: 2023-08-06T06:55:56.386Z
 *                   updated_at:
 *                     type: string
 *                     default: 2023-08-06T06:55:56.386Z
 *                   category:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         default: 3
 *                       name:
 *                         type: string
 *                         default: new_arrival
 *
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
 *                 uuid:
 *                   type: string
 *                   default: c407a7bd-7930-43bc-a424-12aafd058ed3
 *                 name:
 *                   type: string
 *                   default: Top
 *                 material:
 *                   type: string
 *                   default: cotton
 *                 description:
 *                   type: string
 *                   default: Free size top availabe
 *                 color:
 *                   type: string
 *                   default: ["blue", "red"]
 *                 image:
 *                   type: string
 *                   default: ["www.myimage.com", "www.myimage.com"]
 *                 size:
 *                   type: string
 *                   default: ["XL", "LG"]
 *                 price:
 *                   type: integer
 *                   default: 19
 *                 available_stock:
 *                   type: integer
 *                   default: 10
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
 *                   default: Product deleted successfully
 *
 */
