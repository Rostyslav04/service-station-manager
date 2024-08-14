import fs from 'fs/promises';
import { serverErrorHandler, serverSuccessHandler } from '@/utils/serverHandlers';
import { v4 } from 'uuid';
import { connectDb } from '@/utils/readDb';
import { NextRequest } from 'next/server';
import { config, db_path } from '@/config';
import { uploadFile } from '@/utils/api/uploadFile';
import { getFileType } from '@/utils/api/getFileType';
import { checkAndCreateFolder } from '@/utils/api/checkFolder';
import { resBadRequest } from '@/utils/api/response';
import { resFile } from '@/utils/api/resFile';
import { checkFile } from '@/utils/api/checkFile';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const idParam = req.nextUrl.searchParams.get('name');

        if (!idParam) return resBadRequest('id param is not exist');

        const imagePath = `${config.api.folders.upload}/${idParam}`;

        if (!(await checkFile(imagePath))) return new Response('', { status: 404 });

        return resFile(`${config.api.folders.upload}/${idParam}`);
    } catch (err) {
        return serverErrorHandler(JSON.stringify(err));
    }
}

export async function POST(req: NextRequest) {
    try {
        const carId = req.nextUrl.searchParams.get('carId');
        if (!carId) return resBadRequest('carId param is not exist');

        const formData = await req.formData();
        const files = formData.getAll('files') as File[];

        const carDb = await connectDb();

        const successFiles: string[] = [];

        await checkAndCreateFolder(config.api.folders.upload);

        await Promise.allSettled(
            files.map(async (file) => {
                const fileName = `${v4()}.${getFileType(file.name)}`;
                successFiles.push(fileName);
                return await uploadFile(file, `${config.api.folders.upload}/${fileName}`);
            }),
        );

        const updateCarDb = carDb.map((car) => {
            if (car.id === carId) {
                return { ...car, img: successFiles };
            }
            return car;
        });

        await fs.writeFile(db_path, JSON.stringify(updateCarDb));

        return serverSuccessHandler(
            JSON.stringify({
                data: successFiles,
            }),
        );
    } catch (err) {
        return serverErrorHandler(JSON.stringify(err));
    }
}
