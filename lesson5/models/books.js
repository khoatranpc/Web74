import mongoose from "mongoose";
const bookSchema = new mongoose.Schema({
    name: String,
    type: String,
    date: Date,
    authorId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'authors'
    }
});
const BookModel = mongoose.model('books', bookSchema);
export default BookModel;