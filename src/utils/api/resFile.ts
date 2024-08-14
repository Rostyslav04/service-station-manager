import path from 'path';
import fs from 'fs';
import { getContentType } from 'next/dist/server/serve-static';
import { NextResponse } from 'next/server';

export const resFile = (p: string) => {
    const filePath = path.join(p);

    const contentType = getContentType(filePath);
    if (!contentType) return;

    const imageBuffer = fs.readFileSync(filePath);

    return new NextResponse(imageBuffer, {
        status: 200,
        headers: { 'Content-Type': contentType },
    });
};
