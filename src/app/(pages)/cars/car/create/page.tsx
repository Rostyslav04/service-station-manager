'use client';

import React, { useState } from 'react';
import Input from '@/components/Input';
import { DollarSvg } from '@/assets/svg';
import RegisterPlateInput from '@/components/RegisterPlateInput';
import PhotoGallery from '@/components/PhotoGallery';
import PhotoUploader from '@/components/PhotoUpLoader';
import { useCarContext } from '@/contexts/CarContext';
import { PATH } from '@/consts/routes';
import { useRouter } from 'next/navigation';

interface CarState {
    brand: string;
    model: string;
    registerPlate: string;
    year: string;
    price: string;
    buyDate: string;
    status: string;
    startWorkDate: string;
    endWorkDate: string;
    soldDate: string;
    soldPrice: string;
}

export default function Page() {
    const router = useRouter();
    const { addCar} = useCarContext();
    const currentYear = new Date().getFullYear();
    const [info, setInfo] = useState<File[]>([]);

    const [carState, setCarState] = useState<CarState>({
        brand: '',
        model: '',
        registerPlate: '',
        year: '',
        price: '',
        buyDate: '',
        status: '',
        startWorkDate: '',
        endWorkDate: '',
        soldDate: '',
        soldPrice: '',
    });
    const [uploadedPhotos, setUploadedPhotos] = useState<Blob[]>([]);

    const years = Array.from({ length: 101 }, (_, i) => currentYear - i);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCarState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        const payload = { ...carState, setInfo };
        try {
            addCar(payload, info);
            router.push(`${PATH.cars}`);
        } catch (error) {
            console.error('Error adding car:', error);
        }
    };

    return (
        <>
            <h2 className="pageName">Додати автомобіль</h2>
            <div className="pageContent">
                <div className="twoElementsFlex">
                    <div className="photoBox">
                        <div>
                            <PhotoGallery photos={uploadedPhotos} />
                            <PhotoUploader onUpload={(files) => setUploadedPhotos(files)} setFiles={setInfo} />
                        </div>
                    </div>
                    <div className="inputBox">
                        <div className="form">
                            <Input
                                value={carState.brand}
                                onChange={handleChange}
                                placeholder="Марка"
                                name="brand"
                                type="text"
                            />
                            <Input
                                value={carState.model}
                                onChange={handleChange}
                                placeholder="Модель"
                                name="model"
                                type="text"
                            />
                            <select value={carState.year} onChange={handleChange} name="year" className="selectYear">
                                {years.map((year) => (
                                    <option key={year} value={year} className="optionYear">
                                        {year}
                                    </option>
                                ))}
                            </select>
                            <div className="yearInput">
                                <div className="form__group">
                                    <RegisterPlateInput
                                        value={carState.registerPlate}
                                        onChange={(e) =>
                                            setCarState((prevState) => ({
                                                ...prevState,
                                                registerPlate: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                            </div>
                            <input
                                type="date"
                                value={carState.buyDate}
                                onChange={handleChange}
                                name="buyDate"
                                className="selectedDate"
                            />
                            <div className="priseBox">
                                <Input
                                    value={carState.price}
                                    onChange={handleChange}
                                    placeholder="Ціна"
                                    name="price"
                                    type="text"
                                />
                                <DollarSvg className="icoPrise" />
                            </div>
                            <button type="button" className="button" onClick={handleSubmit}>
                                Додати авто
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
