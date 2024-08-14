import React, { useState, useEffect } from 'react';
import { ArrowSvg } from '@/assets/svg';

interface PhotoGalleryWithThumbnailsProps {
    photos: (Blob | undefined)[];
}

const PhotoGalleryWithThumbnails: React.FC<PhotoGalleryWithThumbnailsProps> = ({ photos }) => {
    const [imgListUrl, setImgListUrl] = useState<string[]>([]);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    useEffect(() => {
        // todo fix this
        // @ts-ignore
        setImgListUrl(photos.map((photo) => URL.createObjectURL(photo)));
    }, [photos]);

    const handleThumbnailClick = (index: number) => {
        setCurrentPhotoIndex(index);
    };

    const handlePrevClick = () => {
        setCurrentPhotoIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : imgListUrl.length - 1));
    };

    const handleNextClick = () => {
        setCurrentPhotoIndex((prevIndex) => (prevIndex < imgListUrl.length - 1 ? prevIndex + 1 : 0));
    };

    useEffect(() => {
        setCurrentPhotoIndex(0);
    }, [imgListUrl]);

    return (
        <div className="gallery_Box">
            <div className="gallery_container">
                <div className="main_photo_container">
                    {imgListUrl.length > 0 && (
                        <img
                            src={imgListUrl[currentPhotoIndex]}
                            alt={`Photo ${currentPhotoIndex}`}
                            className="main_photo"
                            onError={(e) => {
                                console.error('Error loading image:', e);
                            }}
                        />
                    )}
                </div>
                <div className="thumbnail_container">
                    {imgListUrl.map((item, index) => (
                        <img
                            key={index}
                            src={item}
                            alt={`Thumbnail ${index}`}
                            className={`thumbnail ${index === currentPhotoIndex ? 'active' : ''}`}
                            onClick={() => handleThumbnailClick(index)}
                            onError={(e) => {
                                console.error('Error loading thumbnail:', e);
                            }}
                        />
                    ))}
                </div>
            </div>
            <div className="navigation_buttons">
                <div className="navigation_button" onClick={handlePrevClick}>
                    <ArrowSvg />
                </div>
                <div className="navigation_button" onClick={handleNextClick}>
                    <ArrowSvg rotate={180} />
                </div>
            </div>
        </div>
    );
};

export default PhotoGalleryWithThumbnails;
