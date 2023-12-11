import jwt from 'jsonwebtoken';
const middlewares = {
    verifyToken: (req, res, next) => {
        try {
            const getToken = req.headers.authorization;
            if (!getToken) throw new Error('Bạn chưa xác thực!');
            const token = String(getToken).split(" ")[1];
            const checkToken = jwt.verify(token, 'WEB74');
            req.accountId = checkToken.accountId;
            return next();
        } catch (error) {
            res.status(401).send({
                message: error.message,
                data: null
            });
            return;
        }
    }
}

export default middlewares;