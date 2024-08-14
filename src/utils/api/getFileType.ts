export const getFileType = (fileName: string) => {
    const extensionRegex = /\.([0-9a-z]+)$/i;
    const match = extensionRegex.exec(fileName);

    if (!match) return '';

    const extension = match[1];

    return extension.toLowerCase();
};
