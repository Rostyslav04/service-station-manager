'use client';
import React, { useEffect, useState } from 'react';
import { useCarsContext } from '@/contexts/CarsContexts';
import TestIMG from '../../../assets/img/1400x936.jpg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { PATH } from '@/consts/routes';
import RegisterPlate from '@/components/RegisterPlate';
import { useCarContext } from '@/contexts/CarContext';

export default function Page() {
    const [selectedCar, setSelectedCar] = useState<any>(null);
    const router = useRouter();

    const { cars } = useCarContext();

    return (
        <>
            <div className={'NameBox'}>
                <h2 className={'pageName'}>Автомобілі</h2>
                <button className={'buttonCreate'} onClick={() => router.push(`${PATH.carCreate}`)}>
                    + додати авто
                </button>
            </div>

            <div className={'cardBox'}>
                {cars.map((car) => (
                    <div
                        key={car.id}
                        className={'item'}
                        onClick={() => {
                            setSelectedCar(car);
                        }}
                    >
                        <div className={'card'} onClick={() => router.push(`${PATH.carDetails}?id=${car.id}`)}>
                            <img src={car.img[0]?.localUrl || ''} alt={''} className={'cardIMG'} />

                            <div className={'cardText'}>
                                <div className={'cardInfo'}>
                                    {car.info.brand} {car.info.model}
                                </div>
                                <RegisterPlate RegisterPlate={car.info.registerPlate} />
                                <div className={'cardInfo'}>Рік: {car.info.year}</div>
                                <div className={'cardInfo'}>
                                    Придбання: <div className={'cardPrice'}>{car.info.price}</div>$
                                </div>
                                <div className={'cardInfo'}>
                                    Дата:{' '}
                                    {new Date(car.info.buyDate).toLocaleDateString('uk-UA', {
                                        day: 'numeric',
                                        month: 'numeric',
                                        year: 'numeric',
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
