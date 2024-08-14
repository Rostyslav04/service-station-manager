import { serverErrorHandler, serverSuccessHandler } from '@/utils/serverHandlers';
import { connectDb } from '@/utils/readDb';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const db = await connectDb();

        const getCars: ICars[] = db.map((car) => {
            return {
                id: car.id,
                img: car.img.map((item) => ({ name: item })),
                info: {
                    status: car.status,
                    brand: car.brand,
                    buyDate: car.buyDate,
                    price: car.price,
                    startWorkDate: car.startWorkDate,
                    model: car.model,
                    year: car.year,
                    registerPlate: car.registerPlate,
                    endWorkDate: car.endWorkDate,
                    soldDate: car.soldDate,
                    soldPrice: car.soldPrice,
                },
            };
        });

        return serverSuccessHandler(JSON.stringify(getCars));
    } catch (err) {
        return serverErrorHandler(JSON.stringify(err));
    }
}
