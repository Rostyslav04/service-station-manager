'use client';

import React, { useEffect, useState } from 'react';
import WorkList from '@/components/WorkList';
import RegisterPlate from '@/components/RegisterPlate';
import PriseList from '@/components/PriceList';
import { useCarContext } from '@/contexts/CarContext';
import { useSearchParams } from 'next/navigation';
import { RecycleBinSvg } from '@/assets/svg';
import { PATH } from '@/consts/routes';
import { useRouter } from 'next/navigation';
import PhotoGallery from '@/components/PhotoGallery';
import { Date } from '@/components/Date';
import Dropdown from '@/components/DropDown';

export default function Page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const carId = searchParams.get('id');
    const options = [{ label: 'waiting' }, { label: 'in work' }, { label: 'done' }, { label: 'sold' }];
    const [currentView, setCurrentView] = useState<'work' | 'prise'>('work');

    const { car, selectCar, deleteCar, carImg } = useCarContext();

    useEffect(() => {
        if (!carId) return;
        selectCar(carId);
    }, [carId]);

    if (!car) return <></>;

    const CarDelete = async () => {
        try {
            if (carId != null) {
                deleteCar({ id: car.id } as { id: string } & ICarWithoutId);
            }
            router.push(`${PATH.cars}`);
        } catch (error) {
            console.error('Error adding car:', error);
        }
    };

    return (
        <>
            <h2 className={'pageName'}>
                <div>
                    {car.info.brand} {car.info.model}
                </div>
                <div onClick={CarDelete}>
                    <RecycleBinSvg className="RecycleBin" />
                </div>
            </h2>
            <div className={'pageContent'}>
                <div className={'twoElementsFlex'}>
                    <div className={'photoBox'}>
                        <PhotoGallery photos={carImg.map((item) => item.blob)} />
                    </div>
                    <div className={'inputBox'}>
                        <div className={'form'}>
                            <div>Рік: {car && car.info.year}</div>
                            <div className={'yearInput'}>
                                <div className={'form__group'}>
                                    {car && <RegisterPlate RegisterPlate={car.info.registerPlate} />}
                                </div>
                            </div>
                            <div>Дата придбання: {car && car.info.buyDate}</div>
                            <div>
                                Початок робіт: {car.info.startWorkDate || 'Дата не встановлена'}
                                {!car.info.startWorkDate && <Date />}
                            </div>
                            <div className={'priseBox'}>
                                Ціна: <div className={'cardPrice'}>{car && car.info.price}</div>$
                            </div>
                            <div>
                                Статус: {car.info.status}
                                <Dropdown options={options} />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={'Buttons_WL_or_PL_Block'}>
                        <button
                            onClick={() => setCurrentView('work')}
                            className={`Buttons_WL_or_PL ${currentView === 'work' ? 'active' : ''}`}
                        >
                            Список робіт
                        </button>
                        <button
                            onClick={() => setCurrentView('prise')}
                            className={`Buttons_WL_or_PL ${currentView === 'prise' ? 'active' : ''}`}
                        >
                            Витрати
                        </button>
                    </div>
                    <div className={'workListCreate'}>
                        {currentView === 'work' && <WorkList />}
                        {currentView === 'prise' && <PriseList />}
                    </div>
                </div>
            </div>
        </>
    );
}
