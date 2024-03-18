import 'dotenv/config'
import './clients/mongo.js'
import express from "express"
import cookieParser from "cookie-parser"
import logger from "morgan"
import cors from "cors"
import swaggerUi from "swagger-ui-express"
import fileUpload from "express-fileupload"
import swaggerSpec from "./helpers/swaggerSpec.js"
import routes from "./routes/index.js"
import ErrorHandler from "./middlewares/error.js"
import path from "node:path";
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
global.appRoot = path.resolve(__dirname);

const app = express();

app.use(cors());
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }
}))
app.use("/product/photos", express.static(path.join(__dirname, "public/images/product")));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(routes)

app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(ErrorHandler);

export default app;
