import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    accountId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'accounts',
        unique: true
    },
    fullName: String,
    address: String,
    age: Number,
    activate: {
        type: Boolean,
        default: false
    }
});
const UserModel = mongoose.model('users', userSchema);
export default UserModel;