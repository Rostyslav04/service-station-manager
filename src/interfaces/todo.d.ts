// interface ITodo {
//     id: string;
//     title: string;
// }

// GET By id
interface ITodoGetByIdReq extends Pick<ITodo, 'id'> {}

interface ITodoGetById extends Omit<ITodo, 'id', 'title'> {}

// Create
interface ITodoCreateReq extends Pick<ITodo, 'title'> {
    carId: string;
}

interface ITodoCreate extends Pick<ITodo, 'id', 'title'> {}

// Update
interface ITodoUpdateReq extends Omit<ITodo, 'title'> {}

interface ITodoUpdate extends Pick<ITodo, 'id'> {}

// Delete
interface ITodoDeleteReq {
    todoId: string;
    carId: string;
}

interface ITodoDelete extends Pick<ITodo, 'id'> {}
