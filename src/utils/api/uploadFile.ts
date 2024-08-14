import path from 'node:path';
import fs from 'node:fs/promises';
import { revalidatePath } from 'next/cache';

export const uploadFile = async (file: File, p: string) => {
    const filePath = path.join(p);

    const arrayBuffer = await file.arrayBuffer();

    const buffer = new Uint8Array(arrayBuffer);

    await fs.writeFile(filePath, buffer);

    revalidatePath('/');
};
