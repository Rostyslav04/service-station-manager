import fs from 'fs/promises';
import { serverErrorHandler, serverSuccessHandler } from '@/utils/serverHandlers';
import { connectDb } from '@/utils/readDb';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const searchParamData = req.nextUrl.searchParams.get('data');
        const db = await connectDb();

        const findRegisterPlate = db.filter((car) => car.registerPlate === searchParamData);
        const findBrand = db.filter((car) => car.brand === searchParamData);
        const findModel = db.filter((car) => car.model === searchParamData);

        const result = {
            brand: findBrand,
            model: findModel,
            registerPlate: findRegisterPlate,
        };

        return serverSuccessHandler(JSON.stringify(result));
    } catch (err) {
        return serverErrorHandler(JSON.stringify(err));
    }
}
