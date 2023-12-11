import { Router } from "express";
import AuthRouter from "./auth.js";
const RootRouter = Router();

// base endpoint
RootRouter.get('/', (req, res) => {
    res.send({
        message: 'Kết nối thành công!'
    });
});

RootRouter.use('/auth', AuthRouter);
export default RootRouter;