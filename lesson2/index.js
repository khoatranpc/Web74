import express from 'express';
import todoListController from './controllers/todoList.js';
const app = express();

app.use(express.json());

app.get('/todos', todoListController.getTodolist);
app.put('/todos/:id', todoListController.updateTodo);
// sử dụng phương thức post, để tạo 1 todo mới -> thêm vào todoList
// dữ liệu gửi cho post qua body
app.post('/todos', todoListController.createTodo);
app.get('', (req, res) => {
    res.send({
        message: 'Kết nối thành công!'
    })
});
app.listen(3001, () => {
    console.log(`Server chạy rùi nè!`);
})