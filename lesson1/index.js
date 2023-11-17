import express from 'express';
const app = express();

const todoList = [
    {
        id: 1,
        todoName: 'Quét nhà, nấu cơm',
        author: 'MAMA'
    }, {
        id: 2,
        todoName: 'Sửa xe máy',
        author: 'DADDY'
    }
];
// url -> giao thức://domain/route...
// API -> Application programming interface
// url -> http://localhost:3001/ -> Base API
app.get('', (req, res) => {
    res.send({
        message: 'Kết nối thành công!'
    });
});
// lấy tất cả
app.get('/todos', (req, res) => {
    res.send({
        message: 'Thành công!',
        data: todoList
    });
});

/* CRUD
YC1: viết API /todos/add -> thực hiện tạo mới một todo (bất kỳ)
     sau đó thêm vào mảng todoList và trả về mảng todoList sau khi đã thêm
YC2: viết API /todos/2 -> thực hiện tìm kiếm phần tử trong mảng todoList
     trả về thông tin tìm kiếm với id là 2
     + Thành công -> trả về dữ liệu, message: 'Thành công'
     + Thất bại -> trả về dữ liệu là null, message: 'Thất bại'
*/
app.get('/todos/add', (req, res) => {
    const newTodo = {
        id: 5,
        todoName: 'Học bài',
        author: 'ME'
    };
    todoList.push(newTodo);
    res.send({
        message: 'Thành công!',
        data: todoList
    })
});
// lấy thông tin chi tiết của 1 phần tử trong 1 resource
app.get('/todos/:id', (req, res) => {
    const { id } = req.params;
    const currentTodo = todoList.find((item) => {
        return Number(item.id) === Number(id);
    });
    // -> tìm thấy -> trả về phần tử đầu tiên mà nó tìm thấy, thoả mãn điều kiện trả về
    // -> không tìm thấy -> trả về undefined
    res.send({
        message: !currentTodo ? 'Thất bại' : 'Thành công',
        data: currentTodo ? currentTodo : null
    });
});
// req.query: https://translate.google.com/?sl=en&tl=vi&text=hello&op=translate
// thực hiện lọc thông tin sử dụng query params,
// lọc các phần tử của todoList với key và value tương ứng truyền qua query params

// về RESTful API thì k chuẩn
// vẫn với api /todos/:id -> thêm query param là các trường thông tin cần cập nhật

app.listen(3001, () => {
    console.log('Server running thành công rồi!');
});