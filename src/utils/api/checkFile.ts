import fs, { promises as fsPr } from 'node:fs';

export const checkFile = async (filePath: string, create?: boolean) => {
    try {
        const isExist = fs.existsSync(filePath);

        if (create && !isExist) {
            await fsPr.writeFile(filePath, '');
            return true;
        }

        return isExist;
    } catch (e) {
        return false;
    }
};
