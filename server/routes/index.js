import {Router} from "express";
const router = Router();

// routes
import auth from "./auth.js";
import product from './product.js';
import order from "./order.js";

router.get('/', function(req, res, next) {
  res.send("Hello.");
});

router.use("/auth", auth);
router.use("/product", product);
router.use("/order", order);

export default router;
