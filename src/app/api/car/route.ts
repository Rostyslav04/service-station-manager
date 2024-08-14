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

        const db = await connectDb();

        const findCar = db.find((car) => car.id === id);
        if (!findCar) return serverErrorHandler('Car is not found');

        const resData: ICarNew = {
            id: findCar.id,
            img: findCar.img.map((item) => ({ name: item })),
            todo: findCar.todo.map((item) => ({
                id: item.id,
                status: item.status,
                category: item.category,
                dateStart: item.dateStart,
                dateEnd: item.dateEnd,
                title: item.title,
            })),
            spends: findCar.spends.map((item) => ({
                id: item.id,
                price: item.price,
                name: item.name,
                quantity: item.quantity,
                category: item.category,
                date: item.date,
            })),
            info: {
                brand: findCar.brand,
                model: findCar.model,
                year: findCar.year,
                registerPlate: findCar.registerPlate,
                price: findCar.price,
                soldPrice: findCar.soldPrice,
                buyDate: findCar.buyDate,
                startWorkDate: findCar.startWorkDate,
                status: findCar.status,
                endWorkDate: findCar.endWorkDate,
                soldDate: findCar.soldDate,
            },
        };

        return serverSuccessHandler(JSON.stringify(resData));
    } catch (err) {
        return serverErrorHandler(JSON.stringify(err));
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const db = await connectDb();

        const newCar: ICar = {
            id: v4(),
            brand: body.brand,
            todo: [],
            img: [],
            spends: [],
            model: body.model,
            year: body.year,
            registerPlate: body.registerPlate,
            price: body.price,
            buyDate: body.buyDate,
            endWorkDate: body.endWorkDate,
            soldDate: body.soldDate,
            startWorkDate: body.startWorkDate,
            soldPrice: body.soldPrice,
            status: 'waiting',
        };

        db.push(newCar);

        await fs.writeFile(db_path, JSON.stringify(db));

        return serverSuccessHandler(JSON.stringify({ id: newCar.id }));
    } catch (err) {
        return serverErrorHandler(JSON.stringify(err));
    }
}

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();

        const db = await connectDb();

        const updateCar: ICar[] = db.map((car) => {
            if (car.id === body.id) {
                return {
                    ...car,
                    startWorkDate: 'startWorkDate' in body ? body.startWorkDate : car.startWorkDate,
                    status: 'info' in body ? body.info.status : car.status,
                };
            }
            return car;
        });

        await fs.writeFile(db_path, JSON.stringify(updateCar));

        return serverSuccessHandler(JSON.stringify({ status: 'done' }));
    } catch (err) {
        return serverErrorHandler(JSON.stringify(err));
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get('id');
        if (!id) return serverErrorHandler('Bad request');

        const db = await connectDb();

        const deleteCar = db.filter((car) => car.id !== id);

        await fs.writeFile(db_path, JSON.stringify(deleteCar));

        return serverSuccessHandler(JSON.stringify({ status: 'done' }));
    } catch (err) {
        return serverErrorHandler(JSON.stringify(err));
    }
}
