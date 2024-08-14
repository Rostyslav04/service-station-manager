import React, { ChangeEvent, FunctionComponent } from 'react';

interface PhotoUploaderProps {
    onUpload: (files: Blob[]) => void;
    setFiles: (files: File[]) => void;
}

const PhotoUploader: FunctionComponent<PhotoUploaderProps> = ({ onUpload, setFiles }) => {
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const blobArray = Array.from(files) as Blob[];
            onUpload(blobArray);
        }
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        setFiles(Array.from(event.target.files));
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFileChange(e);
        handleFileUpload(e);
    };

    return (
        <label htmlFor="fileInput" className={'uploadContainer'}>
            <input type="file" id="fileInput" multiple onChange={onChange} className={'upLoadInput'} />
        </label>
    );
};

export default PhotoUploader;
