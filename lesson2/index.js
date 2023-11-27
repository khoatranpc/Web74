import express from 'express';
import todoListController from './controllers/todoList.js';
import authorController from './controllers/author.js';
import middlewares from './middlewares/index.js';
const app = express();

app.use(express.json());

app.get('/todos', todoListController.getTodolist);
app.put('/todos/:id', middlewares.checkApiKey, middlewares.verifyApiKey, middlewares.checkExistedTodoName, todoListController.updateTodo);
// sử dụng phương thức post, để tạo 1 todo mới -> thêm vào todoList
// dữ liệu gửi cho post qua body



app.post('/todos', middlewares.checkApiKey, middlewares.verifyApiKey, middlewares.checkExistedTodoName, todoListController.createTodo);

app.get('/authors', authorController.getAll);
app.get('/authors/:id', middlewares.checkApiKey, middlewares.verifyApiKey, authorController.getAuthorByIdParam);
app.get('/authors/:id/todos', middlewares.checkApiKey, middlewares.verifyApiKey, authorController.getTodosByAuthorId);
app.get('/authors/:id/todos/:todoId', middlewares.checkApiKey, middlewares.verifyApiKey, authorController.getTodoByTodoIdOfAuthor);
app.put('/authors/:id/todos/:todoId', middlewares.checkApiKey, middlewares.verifyApiKey, authorController.updateTodoByTodoIdOfAuthor);

/**
 * YC1: Viết api cho phép author tạo todo, todoName là trường bắt buộc phải có
 * YC2: Viết middleware cho việc cập nhật todo của một author,
 *      có tác dụng kiểm tra todoName gửi lên phải tồn tại
 * YC3: Viết api xoá todo cho một người
 */
app.get('', (req, res) => {
    res.send({
        message: 'Kết nối thành công!'
    })
});
app.listen(3001, () => {
    console.log(`Server chạy rùi nè!`);
})