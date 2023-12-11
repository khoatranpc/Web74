import express from 'express';
import mongoose from 'mongoose';
import AuthorModel from './models/authors.js';
import BookModel from './models/books.js';
const app = express();
app.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/web74');

app.post('/authors', async (req, res) => {
    const { name, age, area } = req.body;
    const createdAuthor = await AuthorModel.create({ name, age, area });
    res.send({
        message: 'Successfully!',
        data: createdAuthor
    })
})

app.get('/authors', async (req, res) => {
    const listAuthor = await AuthorModel.find();
    res.send({
        message: 'Successfully!',
        data: listAuthor
    })
})

app.post('/books', async (req, res) => {
    const createdBook = await BookModel.create(req.body);
    res.send({
        message: 'Successfully!',
        data: createdBook
    })
})

app.get('/books', async (req, res) => {
    const listBook = await BookModel.find().populate('authorId');
    res.send({
        message: 'Successfully!',
        data: listBook
    })
})

app.get('/books/:id', async (req, res) => {
    const { id } = req.params;
    const book = await BookModel.findById(id).populate('authorId');
    res.send({
        message: 'Successfully!',
        data: book
    })
});

app.put('/books/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body
    const book = await BookModel.findById(id);
    book['name'] = name;
    await book.save();
    res.send({
        message: 'Successfully!',
        data: book
    })
});

app.listen(8000, () => {
    console.log('Server is running!');
})