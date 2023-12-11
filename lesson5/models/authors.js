import mongoose from "mongoose";
const authorSchema = new mongoose.Schema({
    name: String,
    age: Number,
    area: String
});
const AuthorModel = mongoose.model('authors', authorSchema);
export default AuthorModel;