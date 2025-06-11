import createError from "../../utils/error"
import { parse } from '../../../node_modules/zod/dist/esm/v4/classic/parse';

const validBodyRequest = (req, res, next) =>{
    try {
        const data = z.parse(req.body);
    } catch (error) {
        console.log(error)
        next(createError(400, {"Valid body request" : JSON.stringify(error)}))
    }
}