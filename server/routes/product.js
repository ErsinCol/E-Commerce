import {Router} from "express";
import product from "../controllers/product/index.js";
import {verifyAccessToken} from "../helpers/jwt.js";
import grantAccess from "../middlewares/grantAccess.js";

const router = Router();

/**
 * @openapi
 * /product:
 *      get:
 *          tags:
 *              - Product
 *          summary: Retrieve a list of products
 *          description: Returns a list of products
 *          responses:
 *              '200':
 *                  description: Product list
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#components/schemas/Product'
 *              '500':
 *                  description: Internal server error
 * */
router.get("/", product.GetList);

/**
 * @openapi
 * /product/{productId}:
 *      get:
 *          summary: Get a product by ID
 *          tags:
 *              - Product
 *          parameters:
 *              - name: productId
 *                in: path
 *                description: ID of the product to retrieve
 *                required: true
 *                schema:
 *                  type: string
 *          responses:
 *              '200':
 *                  description: Successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              '400':
 *                  description: Bad request. Missing parameter (productId).
 *              '404':
 *                  description: Product not found.
 *              '500':
 *                  description: Internal server error.
 * */
router.get('/:productId', product.Get)

/**
 * @openapi
 * /product:
 *      post:
 *          tags:
 *              - Product
 *          security:
 *              - bearerAuth: []
 *          summary: Create a new product
 *          description: Create a new product
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/Product'
 *          responses:
 *              '201':
 *                  description: Product created successfully.
 *              '401':
 *                  description: Unauthorized. User authentication failed.
 *              '403':
 *                  description: Forbidden. User does not have permission to create a product.
 *              '500':
 *                  description: Internal server error.
 *
 * */
router.post("/", verifyAccessToken, grantAccess("createAny", "product") , product.Create)


/**
 * @openapi
 * /product/{productId}:
 *      put:
 *          tags:
 *              - Product
 *          summary: Update product
 *          parameters:
 *              - name: productId
 *                in: path
 *                description: ID of the product to update
 *                required: true
 *                schema:
 *                  type: string
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/Product'
 *              required: true
 *          responses:
 *              '200':
 *                  description: Product updated successfully.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#components/schemas/Product'
 *              '400':
 *                  description: Bad request.
 *              '500':
 *                  description: Internal server error.
 * */
router.put('/:productId', product.Update)
export default router;