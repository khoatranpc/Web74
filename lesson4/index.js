import express from 'express';
import { genToken } from './utils/index.js';
import { checkToken } from './middlewares.js';
const app = express();
app.use(express.json());

const users = [
    {
        id: "1",
        userName: "nobita.jp",
        password: "123"
    }
]

app.post('/login', (req, res) => {
    const { userName, password } = req.body;
    const currentUser = users.find((item) => {
        return item.userName === userName && item.password === password
    });
    if (!currentUser) {
        res.send({
            message: 'Sai tài khoản hoặc mật khẩu!'
        });
        return;
    }
    res.send({
        message: 'Đăng nhập thành công!',
        data: genToken({
            id: currentUser.id
        })
    });
});

app.post('/register', (req, res) => {

});

// lấy thông tin của 1 user qua params
app.get('/users/:id', (req, res) => {

})

app.put('/users/:id', checkToken, (req, res) => {
    const { id } = req.params;
    const authen = req.authen;
    if (authen.id !== id) {
        res.send({
            message: 'Bạn không thể thực hiện hành động!'
        })
        return;
    }
    const { password, confirmPassword } = req.body;
    const findUser = users.find((item) => item.id === id);
    if (!findUser) {
        res.send({
            message: 'Không tìm thấy user'
        });
        return;
    }
    if (!password || !confirmPassword) {
        res.send({
            message: 'Bạn cần phải nhập password và confirmPassword..'
        });
        return;
    }
    if (password !== confirmPassword) {
        res.send({
            message: 'Mật khẩu không khớp!'
        });
        return;
    }
    findUser.password = password;
    res.send({
        message: 'Cập nhật mật khẩu thành công!'
    });
});

app.listen(3005, () => {
    console.log('serer đã được chạy!');
})