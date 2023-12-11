import { Router } from "express";
const AuthRouter = Router();

AuthRouter.post('/login', (req, res) => {
    // logic.....
    res.send({
        message: 'API Đăng nhập!'
    })
});
export default AuthRouter;
