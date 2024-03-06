import {Router} from "express";
const router = Router();

// routes
import auth from "./auth.js";

/**
* @openapi
* /:
*   get:
*     tags:
*       - Greeting
*     summary: Get a greeting message
*     description: Get a greeting message
*     responses:
*       200:
*         description: Successful response with a greeting message
*         content:
*           text/plain:
*             schema:
*               type: string
*       500:
*         description: Internal server error
*/
router.get('/', function(req, res, next) {
  res.send("Hello.");
});

router.use("/auth", auth);

export default router;
