import jwt from 'jsonwebtoken';
const createToken = (data) => {
    const token = jwt.sign(data, 'WEB74', {
        expiresIn: 1000 * 60 * 5
    });
    return token;
}
export {
    createToken
}