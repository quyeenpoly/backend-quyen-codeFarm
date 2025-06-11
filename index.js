
import  express  from 'express';
import router from './src/routes/index.js';
import connectDB from './src/configs/db.js';
import { HOST, PORT } from './src/configs/enviroments.js';
import errorHandler from './src/middlewares/errorHandle.js';
import cors from "cors"

connectDB()

const app = express();

app.use(cors());

app.use(express.json())


app.use("/api", router)

app.use(errorHandler)

app.listen(PORT, HOST, ()=>{
    console.log(`Server đang chạy trên cổng: http://${HOST}:${PORT}/`)
})