import fs from 'fs/promises';
import { serverErrorHandler, serverSuccessHandler } from '@/utils/serverHandlers';
import { v4 } from 'uuid';
import { connectDb } from '@/utils/readDb';
import { NextRequest } from 'next/server';
import { db_path } from '@/config';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get('id');
        if (!id) return serverErrorHandler('Bad request');

        const data = await fs.readFile(db_path, 'utf8');
        const jsonData = JSON.parse(data) as ICar[];
        const findCar = jsonData.find((car) => id === car.id);

        return serverSuccessHandler(JSON.stringify(findCar?.todo));
    } catch (err) {
        return serverErrorHandler(JSON.stringify(err));
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const data = await fs.readFile(db_path, 'utf8');
        const jsonData = JSON.parse(data) as ICar[];

        const newToDo: ICarTodo = {
            id: v4(),
            title: body.title,
            status: body.status,
            category: body.category,
            dateStart: body.dateStart,
            dateEnd: body.dateEnd,
        };

        const newData = jsonData.map((car) => {
            if (car.id === body.carId) {
                return { ...car, todo: [...car.todo, newToDo] };
            }
            return car;
        });

        await fs.writeFile(db_path, JSON.stringify(newData));

        return serverSuccessHandler(JSON.stringify(newToDo));
    } catch (err) {
        return serverErrorHandler(JSON.stringify(err));
    }
}

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();

        const db = await connectDb();

        const updateCar: ICar[] = db.map((car) => {
            if (car.id === body.carId) {
                return {
                    ...car,
                    todo: car.todo.map((todo) => {
                        if (todo.id === body.id) {
                            return {
                                ...todo,
                                title: body.title !== undefined ? body.title : todo.title,
                                status: body.status !== undefined ? body.status : todo.status,
                                dateEnd: body.dateEnd !== undefined ? body.dateEnd : todo.dateEnd,
                            };
                        }
                        return todo;
                    }),
                };
            }
            return car;
        });

        await fs.writeFile(db_path, JSON.stringify(updateCar));

        return serverSuccessHandler(JSON.stringify({ status: 'ok' }));
    } catch (err) {
        return serverErrorHandler(JSON.stringify(err));
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const body = await req.json();

        const data = await fs.readFile(db_path, 'utf8');
        let jsonData = JSON.parse(data) as ICar[];

        const deleteTodo = jsonData.find((todo) => todo.id === body.todoId);

        jsonData = jsonData.map((car) => {
            if (car.id === body.carId) {
                return {
                    ...car,
                    todo: car.todo.filter((todo) => todo.id !== body.todoId),
                };
            }
            return car;
        });

        await fs.writeFile(db_path, JSON.stringify(jsonData));

        return serverSuccessHandler(JSON.stringify(deleteTodo));
    } catch (err) {
        return serverErrorHandler(JSON.stringify(err));
    }
}
