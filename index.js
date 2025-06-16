import  express  from 'express';
import router from './src/routes/index.js';
import connectDB from './src/common/configs/connectDB.js';
import { HOST, PORT } from './src/common/configs/environments.js';
import errorHandler from './src/common/middlewares/errorHandle.js';
import cors from "cors"
import setupSwagger from "./src/common/configs/swagger-config.js";

connectDB()


const app = express();

app.use(cors({
	origin: 'http://localhost:5173', // chỉ cho phép truy cập từ địa chỉ này
	credentials: true, // cho phép gửi cookie từ client
	
}));

app.use(express.json())


app.use("/api", router)
setupSwagger(app);
app.use(errorHandler)

app.listen(PORT,  () => {
	console.log(`Server is running on: http://${HOST}:${PORT}/api`);
	console.log(`Swagger Docs available at http://${HOST}:${PORT}/api-docs`)
});