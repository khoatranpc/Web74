import jwt from 'jsonwebtoken';

const SECRET_KEY = "KH034$%o12"
const genToken = (data) => {
    const token = jwt.sign(data, SECRET_KEY, {
        expiresIn: 0
    });
    return token;
}
const verifyToken = (token) => {
    try {
        const decode = jwt.verify(token, SECRET_KEY);
        return decode
    } catch (error) {
        return error.message;
    }
}
export {
    verifyToken,
    genToken
}