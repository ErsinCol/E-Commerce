import {Router} from "express";
import auth from "../controllers/auth/index.js";

const router = Router();

/**
* @openapi
* /auth/register:
*   post:
*     summary: Register a new user
*     description: Register a new user
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*                  email:
*                      type: string
*                      description: Email of the user
*                  password:
*                      type: string
*                      description: Password of the user
*           example:
*             email: example@example.com
*             password: '123456'
*     responses:
*       200:
*         description: User registered successfully
*       400:
*         description: Bad request, validation error
*       409:
*         description: Conflict, email already exists
*       500:
*         description: Internal server error
*/

router.post("/register", auth.Register);

export default router;
