import { authors } from "../database/data.js";

const middlewares = {
    checkApiKey: (req, res, next) => {
        const { apiKey } = req.query;
        if (apiKey) return next();
        res.send({
            message: 'Bạn không có quyền thực hiện hành động!'
        });
        return;
    },
    verifyApiKey: (req, res, next) => {
        const { apiKey } = req.query;
        const checkExistedApiKey = authors.find((item) => String(item.id) === apiKey);
        if (checkExistedApiKey) return next();
        res.send({
            message: 'Bạn không có quyền thực hiện hành động!'
        });
        return;
    },
    checkExistedTodoName: (req, res, next) => {
        const { todoName } = req.body;
        if (!todoName) {
            res.send({
                message: 'Thất bại! Bạn cần truyền todoName'
            });
            return;
        }
        return next();
    }
}
export default middlewares;