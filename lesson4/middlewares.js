import { verifyToken } from "./utils/index.js";

const checkToken = (req, res, next) => {
    const getToken = req.headers['authorization'] ? String(req.headers['authorization']).split(" ")[1] : undefined;
    if (!getToken) {
        res.send({
            message: 'Bạn không thể thực hiện hành động!'
        });
        return;
    }
    const decode = verifyToken(getToken);
    if (typeof decode === 'string') {
        res.send({
            message: 'Xảy ra lỗi xác thực!',
            error: decode
        });
        return
    }
    req.authen = decode;
    return next();
}
export {
    checkToken
}