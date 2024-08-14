import axios from 'axios';

export const createCarToDoReq = (data: ICarTodo) =>
    axios<ICarTodo>({
        method: 'POST',
        url: `/api/todo`,
        data,
    });

export const deleteReq = (data: ITodoDeleteReq) =>
    axios<ITodoDeleteReq>({
        method: 'DELETE',
        url: '/api/todo',
        data,
    });

export const putToDoReq = (data: ICarTodo_CarId) =>
    axios<ICarTodo>({
        method: 'PUT',
        url: '/api/todo',
        data,
    });

class ToDo {
    public async getAllTodo(id: string) {
        const res = await fetch(`/api/todo?id=${id}`, { method: 'GET' });
        return await res.json();
    }

    public async putReq() {
        const res = await fetch('/api/car', { method: 'PUT' });
        return await res.json();
    }
}

export const toDoServices = new ToDo();
