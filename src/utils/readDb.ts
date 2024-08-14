import fs from 'fs/promises';
import { db_path } from '@/config';

export const connectDb = async () => {
    const readFile = await fs.readFile(db_path, 'utf8');
    const db = JSON.parse(readFile) as ICar[];

    return db;
};
