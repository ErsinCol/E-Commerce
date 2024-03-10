import {Router} from "express";
import Order from "../controllers/order/index.js";
import {verifyAccessToken} from "../helpers/jwt.js";

const router = Router();

/**
 * @openapi
 * /order:
 *      post:
 *          tags:
 *              - Order
 *          summary: Create a new order
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Order'
 *          responses:
 *              '201':
 *                  description: Order created successfully
 *              '400':
 *                  description: Invalid address or items
 *              '401':
 *                  $ref: '#/components/responses/UnauthorizedError'
 * */
router.post("/", verifyAccessToken , Order.Create);

export default router;
