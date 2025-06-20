import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import MESSAGES from '../../common/constant/messages.js';
import createError from '../../utils/error.js';
import handleAsync from '../../utils/handleAsync.js';
import User from '../user/user.model.js';
import createResponse from '../../utils/response.js';
import { JWT_SECRET_KEY , JWT_EXPIRES_IN} from '../../common/configs/environments.js';

export const authRegister = handleAsync(async (req, res, next) => {
    // ! B1: Kiểm tra email
    // ! B2: Mã hóa mật khẩu
    // ! B3: Tạo người dùng mới
    // ! B4: Ẩn mật khẩu khỏi response
    const { email, password } = req.body;

    // 1. Kiểm tra email đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(createError(400, MESSAGES.AUTH.EMAIL_ALREADY_EXISTS));
    }

    // 2. Mã hóa mật khẩu
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    // 3. Tạo người dùng mới
    const newUser = await User.create({
        ...req.body,
        password: hash,
        role: 'guest'
    });

    if (!newUser) {
        return next(createError(500, MESSAGES.AUTH.REGISTER_FAILED));
    }

    // 4. Ẩn mật khẩu khỏi response
    newUser.password = undefined;

    // 5. Trả response
    return res.status(201).json(
        createResponse(true, 201, MESSAGES.AUTH.REGISTER_SUCCESS, newUser)
    );
});

export const authLogin = handleAsync(async (req, res, next) => {
    // !B1: Kiểm tra user tồn tại
    // !B2: So sánh mật khẩu
    // !B3: Greate token
    // !B4: Trả response
    const { email, password } = req.body;
    // 1. Tìm user theo email
    const existingUser = await User.findOne({ email })
    if (!existingUser) {
        return next(createError(400, MESSAGES.AUTH.USER_NOT_FOUND));
    }
    // 2. So sánh mật khẩu
    const isMatch = bcrypt.compareSync(password, existingUser.password);
    if (!isMatch) {
        return next(createError(400, MESSAGES.AUTH.INVALID_PASSWORD));
    }
    // 3. Tạo token
    const accessToken = jwt.sign( // Tạo token
        // payload: thông tin người dùng, chỉ cần id là đủ
        { id: existingUser._id},
        // secret key: dùng để mã hóa token
        JWT_SECRET_KEY,
        // options: thời gian hết hạn của token
        { expiresIn: JWT_EXPIRES_IN}
    );

    if(accessToken){
        existingUser.password = undefined; // Ẩn mật khẩu khỏi response
        return res.status(200).json(
            createResponse(true, 200, MESSAGES.AUTH.LOGIN_SUCCESS, {
                user: existingUser, // Trả về thông tin người dùng không có mật khẩu
                accessToken
            })
        );
    }
    return next(createError(500, MESSAGES.AUTH.LOGIN_FAILED));
});

