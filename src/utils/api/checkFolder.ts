import fs from 'node:fs/promises';

export const checkAndCreateFolder = async (path: string) => {
    try {
        await fs.mkdir(path, { recursive: true });
    } catch (err) {
        console.error('Error creating upload directory', err);
        throw err;
    }
};
