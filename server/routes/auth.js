import {Router} from "express";
import auth from "../controllers/auth/index.js";

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

export default router;
