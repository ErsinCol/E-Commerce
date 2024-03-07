import 'dotenv/config'
import './clients/mongo.js'
import express from "express"
import cookieParser from "cookie-parser"
import logger from "morgan"
import cors from "cors"
import swaggerUi from "swagger-ui-express"
import swaggerSpec from "./helpers/swaggerSpec.js"
import routes from "./routes/index.js"
import errMiddleware from "./middleware/error.js"

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(routes)

app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(errMiddleware)

export default app;
