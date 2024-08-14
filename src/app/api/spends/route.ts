import fs from 'fs/promises';
import { serverErrorHandler, serverSuccessHandler } from '@/utils/serverHandlers';
import { v4 } from 'uuid';
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

        return serverSuccessHandler(JSON.stringify(findCar?.spends));
    } catch (err) {
        return serverErrorHandler(JSON.stringify(err));
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const data = await fs.readFile(db_path, 'utf8');
        const jsonData = JSON.parse(data) as ICar[];

        const newSpends: ICarSpend = {
            id: v4(),
            price: body.price,
            name: body.name,
            quantity: body.quantity,
            category: body.category,
            date: body.date,
        };

        const newData = jsonData.map((car) => {
            if (car.id === body.carId) {
                return { ...car, spends: [...car.spends, newSpends] };
            }
            return car;
        });

        await fs.writeFile(db_path, JSON.stringify(newData));
        console.log(newSpends);

        return serverSuccessHandler(JSON.stringify(newSpends));
    } catch (err) {
        return serverErrorHandler(JSON.stringify(err));
    }
}

//////// PUT request ////////

export async function DELETE(req: NextRequest) {
    try {
        const body = await req.json();

        const data = await fs.readFile(db_path, 'utf8');
        let jsonData = JSON.parse(data) as ICar[];

        const deleteSpend = jsonData.find((spends) => spends.id === body.spendId);

        jsonData = jsonData.map((car) => {
            if (car.id === body.carId) {
                return {
                    ...car,
                    spends: car.spends.filter((spend) => spend.id !== body.spendId),
                };
            }
            return car;
        });

        await fs.writeFile(db_path, JSON.stringify(jsonData));

        return serverSuccessHandler(JSON.stringify(deleteSpend));
    } catch (err) {
        return serverErrorHandler(JSON.stringify(err));
    }
}
