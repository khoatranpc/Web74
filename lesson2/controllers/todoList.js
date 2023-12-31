import { todoList } from "../database/data.js";

const todoListController = {
    getTodolist: (req, res) => {
        const query = req.query;
        if (Object.keys(query).length) {
            const filterData = todoList.filter((item) => {
                let check = false;
                const checkCountMax = Object.keys(query).length;
                let countCheck = 0;
                for (const key in item) {
                    // sử dụng phương thức .includes()
                    if (item[key] === query[key]) {
                        countCheck++;
                    }
                }
                if (countCheck === checkCountMax) {
                    check = true;
                }
                return check;
            });
            res.send({
                message: 'Thành công!',
                data: filterData
            });
        } else {
            res.send({
                message: 'Thành công!',
                data: todoList
            });
        }
    },
    updateTodo: (req, res) => {
        const { id } = req.params;
        const { todoName } = req.body;
        const currentTodo = todoList.find(item => String(item.id) === id);
        if (currentTodo) {
            if (typeof todoName !== 'undefined') currentTodo['todoName'] = todoName;
            res.send({
                message: 'Cập nhật thành công!',
                data: currentTodo
            });
        } else {
            res.send({
                message: 'Không tìm được kết quả phù hợp!',
                data: undefined
            });
        }
    },
    createTodo: (req, res) => {
        const { todoName } = req.body;
        const { apiKey } = req.query;
        const newTodo = {
            id: todoList.length,
            todoName,
            author: apiKey
        }
        todoList.push(newTodo);
        res.send({
            message: 'Thêm mới thành công!',
            data: todoList
        });
    }
}
export default todoListController;
