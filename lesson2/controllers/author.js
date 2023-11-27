import { authors, todoList } from "../database/data.js";

const authorController = {
    getAll: (req, res) => {
        res.send({
            message: "Thành công!",
            data: authors
        });
    },
    getAuthorByIdParam: (req, res) => {
        const { id } = req.params;
        // find -> trả về 1 phần tử, đầu tiên mà thoả mãn điều kiện trả về, nếu không tìm được -> undefined
        // filter -> trả về là 1 mảng, thoả mãn điều kiện trả về
        const currentAuthor = authors.find((item) => {
            return String(item.id) === id;
        });
        if (!currentAuthor) {
            res.send({
                message: 'Thất bại! Không tìm thấy author tương ứng!',
                data: undefined
            });
        } else {
            res.send({
                message: 'Thành công!',
                data: currentAuthor
            });
        }
    },
    getTodosByAuthorId: (req, res) => {
        const { id } = req.params;
        // find -> trả về 1 phần tử, đầu tiên mà thoả mãn điều kiện trả về, nếu không tìm được -> undefined
        // filter -> trả về là 1 mảng, thoả mãn điều kiện trả về
        const currentAuthor = authors.find((item) => {
            return String(item.id) === id;
        });
        if (!currentAuthor) {
            res.send({
                message: 'Thất bại! Không tìm thấy author tương ứng!',
                data: undefined
            });
        } else {
            const authorTodos = todoList.filter((item) => {
                return String(item.author) === id;
            });
            res.send({
                message: 'Thành công!',
                data: authorTodos
            });
        }
    },
    getTodoByTodoIdOfAuthor: (req, res) => {
        const { id, todoId } = req.params;
        // find -> trả về 1 phần tử, đầu tiên mà thoả mãn điều kiện trả về, nếu không tìm được -> undefined
        // filter -> trả về là 1 mảng, thoả mãn điều kiện trả về
        const currentAuthor = authors.find((item) => {
            return String(item.id) === id;
        });
        if (!currentAuthor) {
            res.send({
                message: 'Thất bại! Không tìm thấy author tương ứng!',
                data: undefined
            });
        } else {
            const authorTodo = todoList.find((item) => {
                return String(item.id) === todoId;
            });
            res.send({
                message: authorTodo ? 'Thành công!' : 'Thất bại, không tìm thấy dữ liệu',
                data: authorTodo
            });
        }
    },
    updateTodoByTodoIdOfAuthor: (req, res) => {
        const { id, todoId } = req.params;
        const { todoName } = req.body;
        // find -> trả về 1 phần tử, đầu tiên mà thoả mãn điều kiện trả về, nếu không tìm được -> undefined
        // filter -> trả về là 1 mảng, thoả mãn điều kiện trả về
        const currentAuthor = authors.find((item) => {
            return String(item.id) === id;
        });
        if (!currentAuthor) {
            res.send({
                message: 'Thất bại! Không tìm thấy author tương ứng!',
                data: undefined
            });
        } else {
            const authorTodo = todoList.find((item) => {
                return String(item.id) === todoId;
            });
            if (authorTodo) {
                authorTodo.todoName = todoName;
            }
            res.send({
                message: authorTodo ? 'Thành công!' : 'Thất bại, không tìm thấy dữ liệu',
                data: authorTodo
            });
        }
    },
}
export default authorController;