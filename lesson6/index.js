import express from 'express';
import mongoose from 'mongoose';
import AccountModel from './models/accounts.js';
import UserModel from './models/users.js';
import { createToken } from './utils.js';
import middlewares from './middlewares/index.js';
const app = express();
mongoose.connect('mongodb://localhost:27017/web74')
app.use(express.json());

app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password || (password && String(password).length <= 6)) {
            res.status(403).send({
                message: 'Email và password cần được cung cấp, password phải lớn hơn 6 ký tự'
            });
            return;
        }
        const createdAccount = await AccountModel.create(req.body);
        // const createdUserInfo = await UserModel.create({
        //     accountId: createdAccount._id,
        //     activate: false
        // });
        res.status(201).send({
            message: 'Đăng ký thành công!',
            data: createdAccount
        })
        return;
    } catch (error) {
        res.status(403).send({
            message: error.message
        })
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const currentAccount = await AccountModel.findOne({
            email,
            password
        });
        if (!currentAccount) {
            throw new Error('Sai tài khoản hoặc mật khẩu!')
        }
        const currentUserInfo = await UserModel.findOne({
            accountId: currentAccount._id
        });
        res.status(200).send({
            message: currentUserInfo && currentUserInfo.activate ? 'Đăng nhập thành công' : 'Bạn cần cập nhật thông tin để kích hoạt tài khoản!',
            data: createToken({
                accountId: currentAccount._id
            }),
        });
    } catch (error) {
        res.status(401).send({
            message: error.message,
            data: null
        })
    }
});

app.post('/users', middlewares.verifyToken, async (req, res) => {
    try {
        const { accountId } = req.accountId;
        const { fullName, address, age } = req.body;

        const createdInfo = await UserModel.create({
            accountId, fullName, address, age,
            activate: true
        });
        res.status(201).send({
            message: 'Cập nhật thông tin thành công!',
            data: createdInfo
        });
    } catch (error) {
        res.status(403).send({
            message: error.code === 11000 ? 'Đã có thông tin người dùng!' : error.message
        })
    }

});
app.listen(3005, () => {
    console.log('Server chạy rùi nè!');
})