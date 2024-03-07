import {Router} from "express";
import product from "../controllers/product/index.js";

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

export default router;