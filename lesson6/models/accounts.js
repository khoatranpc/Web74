import mongoose from "mongoose";

const accountSChema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: String
});
const AccountModel = mongoose.model('accounts', accountSChema);
export default AccountModel;
