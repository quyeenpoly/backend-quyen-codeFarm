import  express  from 'express';
import router from './src/routes/index.js';
import connectDB from './src/common/configs/connectDB.js';
import { HOST, PORT } from './src/common/configs/environments.js';
import errorHandler from './src/common/middlewares/errorHandle.js';
import cors from "cors"
import setupSwagger from "./src/common/configs/swagger-config.js";

connectDB()

const app = express();

// Middleware
app.use(cors()); // Cho phép tất cả các nguồn trong môi trường development

app.use(express.json());
// Routes
app.use('/api', router);


// Error handler
app.use(errorHandler);

// Setup Swagger
setupSwagger(app);

app.listen(PORT, HOST, () => {
	console.log(`Server is running on http://${HOST}:${PORT}`);
	console.log(`Swagger Docs available at http://${HOST}:${PORT}/api-docs`)
});