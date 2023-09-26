import { Router } from 'express';
import {
  getAllproducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from 'controller/product.controller';
import * as newArrivalController from 'controller/newArrival.controller';
import { validate } from 'middleware/validate';

const router = Router();
export const newArrivalRouter = Router();

router.use('/newArrivals', newArrivalRouter); // setting nested route for new Arrivals in product route

// API hitpoint for /api/v1/products/newArrivals to get all the new arrival products

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: The Product manageing api
 *
 * /api/v1/products:
 *  get:
 *     tags: [Products]
 *     summary: Get All Products
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: false
 *         description: Searches for products based on the input text in the product name field.
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: integer
 *         required: false
 *         description: Filters products with a price less than or equal to the specified maximum price.
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: integer
 *         required: false
 *         description: Filters products with a price greater than or equal to the specified minimum price.
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         required: false
 *         description: Filters products by one or more category names. Can accept a single string or an array of strings.
 *       - in: query
 *         name: material
 *         schema:
 *           type: string
 *         required: false
 *         description: Filters products by one or more material names. Can accept a single string or any array of strings.
 *       - in: query
 *         name: color
 *         schema:
 *           type: string
 *         required: false
 *         description: Filters products by one or more color names. Can accept a single string or an array of strings.
 *       - in: query
 *         name: size
 *         schema:
 *           type: string
 *         required: false
 *         description: Filters products by one or more size identifiers. Can accept a single string or an array of strings.
 *       - in: query
 *         name: sortByPrice
 *         schema:
 *           type: string
 *         required: false
 *         description: Specifies the sorting order of the results based on the product price. Can be set to either ascending ('ASC') or descending ('DESC') order.
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetAllProductResponse'
 *       404:
 *          $ref: '#/components/responses/NotFound'
 *       500:
 *          $ref: '#/components/responses/ServerError'
 */
router.get('/', getAllproducts);

/**
 *
 * @swagger
 * /api/v1/products:
 *  post:
 *    tags: [Products]
 *    summary: Creates a product.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateProduct'
 *    responses:
 *      201:
 *        description: Product created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateNewProductResponse'
 *      400:
 *         $ref: '#/components/responses/BadRequest'
 *      500:
 *         $ref: '#/components/responses/ServerError'
 *
 */
router.post('/', validate('productSchema', 'createProduct'), createProduct);

/**
 * @swagger
 * /api/v1/products/{uuid}:
 *  get:
 *     tags: [Products]
 *     summary: Get particular Product
 *     description: Get particular Product
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *         description: uuid of a particular product
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetProductResponse'
 *       400:
 *          $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *          $ref: '#/components/responses/NotFound'
 *       500:
 *          $ref: '#/components/responses/ServerError'
 */
router.get('/:uuid', getSingleProduct);

/**
 * @swagger
 * /api/v1/products/{uuid}:
 *  patch:
 *     tags: [Products]
 *     summary: update particular product
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *         description: uuid of a product
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProduct'
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateProductResponse'
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
  '/:uuid',
  validate('productSchema', 'updateProduct'),
  updateProduct
);

/**
 * @swagger
 * /api/v1/products/{uuid}:
 *  delete:
 *     tags: [Products]
 *     summary: Delete particular product
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *         description: uuid of a product
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteProductResponse'
 *       400:
 *          $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *          $ref: '#/components/responses/NotFound'
 *       500:
 *          $ref: '#/components/responses/ServerError'
 */
router.delete('/:uuid', deleteProduct);

// new arrival hitpoints

// API hitpoint for /api/v1/products/newArrivals to get all the new arrival products

/**
 * @swagger
 * /api/v1/products/newArrivals:
 *  get:
 *     tags: [NewArrivals]
 *     summary: Get All New Arrival Products
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetAllNewArrivalsResponse'
 *       404:
 *          $ref: '#/components/responses/NotFound'
 *       500:
 *          $ref: '#/components/responses/ServerError'
 */
newArrivalRouter.get('/', newArrivalController.getAllNewArrivals);

// API hitpoint for /api/v1/products/newArrivals/:id to create new Arrival product
/**
 *
 * @swagger
 * tags:
 *   name: NewArrivals
 *   description: The New Arrivals manageing api
 *
 * /api/v1/products/newArrivals:
 *  post:
 *    tags: [NewArrivals]
 *    summary: Creates a new Arrivals product.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateNewArrival'
 *    responses:
 *      201:
 *        description: New Arrival Product created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateNewArrivalResponse'
 *      400:
 *         $ref: '#/components/responses/BadRequest'
 *      500:
 *         $ref: '#/components/responses/ServerError'
 *
 */
newArrivalRouter.post(
  '/',
  validate('newArrivalSchema', 'createNewArrival'),
  newArrivalController.creteNewArrival
);

// API hitpoint for /api/v1/products/newArrivals/:id to update new Arrival product
/**
 * @swagger
 * /api/v1/products/newArrivals/{id}:
 *  patch:
 *     tags: [NewArrivals]
 *     summary: update particular new arrival product
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id of a new arrival
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateNewArrival'
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateNewArrivalResponse'
 *       400:
 *          $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *          $ref: '#/components/responses/NotFound'
 *       500:
 *          $ref: '#/components/responses/ServerError'
 */
newArrivalRouter.patch(
  '/:id',
  validate('newArrivalSchema', 'updateNewArrival'),
  newArrivalController.updateNewArrival
);

// API hitpoint for /api/v1/products/newArrivals/:id to delete new arrival prouduct
/**
 * @swagger
 * /api/v1/products/newArrivals/{id}:
 *  delete:
 *     tags: [NewArrivals]
 *     summary: Delete particular new arrival product
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id of a new arrival
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteNewArrivalResponse'
 *       400:
 *          $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *          $ref: '#/components/responses/NotFound'
 *       500:
 *          $ref: '#/components/responses/ServerError'
 */
newArrivalRouter.delete('/:id', newArrivalController.deleteNewArrival);

export default router;
