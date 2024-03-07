import {Router} from "express";
import auth from "../controllers/auth/index.js";
import {verifyAccessToken} from "../helpers/jwt.js";

const router = Router();

/**
* @openapi
* /auth/register:
*   post:
*     tags:
*       - Auth
*     summary: Register a new user
*     description: Register a new user
*     requestBody:
*       description: Register a new user
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*           example:
*             email: example@example.com
*             password: '123456'
*     responses:
*       '201':
*         description: User registered successfully
*       '400':
*         description: Bad request, validation error
*       '409':
*         description: Conflict, email already exists
*       '500':
*         description: Internal server error
*/
router.post("/register", auth.Register);

/**
* @openapi
* /auth/login:
*   post:
*      tags:
*         - Auth
*      summary: User login
*      description: Authenticate and login a user
*      requestBody:
*           description: User credentials for login
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/User'
*                   example:
*                       email: example@example.com
*                       password: '123456'
*      responses:
*           '200':
*               description: User authenticated successfully
*           '400':
*               description: Bad request, validation error
*           '404':
*               description: User not found
*           '401':
*               description: Unauthorized, invalid credentials
*           '500':
*               description: Internal server error
*
*/
router.post("/login", auth.Login);

/**
 * @openapi
 * /auth/logout:
 *      post:
 *          tags:
 *              - Auth
 *          summary: User logout
 *          description: Logs out the user by invalidating the provided refresh token.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              refresh_token:
 *                                  type: string
 *                                  description: Refresh token to be used for logout.
 *          responses:
 *              '200':
 *                  description: User successfully logout.
 *              '400':
 *                  description: Bad request. Invalid or missing refresh token.
 *              '500':
 *                  description: Internal server error.
 * */
router.post("/logout", auth.Logout);

/**
 * @openapi
 * /auth/refresh_token:
 *      post:
 *          tags:
 *              - Auth
 *          summary: Refresh session
 *          description: Refresh session with refresh token
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              refresh_token:
 *                                  type: string
 *          responses:
 *              '200':
 *                  description: Session successfully refreshed
 *              '400':
 *                  description: Invalid or missing refresh token
 *              '500':
 *                  description: Internal server error
 * */
router.post("/refresh_token", auth.RefreshToken);

/**
 * @openapi
 * /auth/me:
 *      get:
 *          summary: Get current user data
 *          description: Retrieves the data of the currently authenticated user.
 *          security:
 *              - bearerAuth: []
 *          tags:
 *              - Auth
 *          responses:
 *               '200':
 *                  description: User data retrieved
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                  email:
 *                                      type: string
 *                                  role:
 *                                      type: string
 *                                      enum: [user, admin]
 *               '401':
 *                  description: Authentication credentials are missing or invalid
 *               '500':
 *                  description: Internal server error
 * */
router.get("/me", verifyAccessToken, auth.Me);
export default router;
