'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { carServices } from '@/services/carServices';
import { useAppContext } from '@/contexts/AppContexts';

interface IProps {
    cars: ICarGetAll[];
    getCars: (status: string) => Promise<void>;
}

interface IProviderProps {
    children: React.ReactNode;
}

const CarsContext = createContext<IProps>(null!);

export const CarsProvider = (props: IProviderProps) => {
    const [cars, setCars] = useState<ICarGetAll[]>([]);

    const { setIsLoading } = useAppContext();

    const getCars = async (status: string) => {
        try {
            setIsLoading(false);
            const res = await carServices.getAllReq(status);
            setCars(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <CarsContext.Provider
            value={{
                cars,
                getCars,
            }}
        >
            {props.children}
        </CarsContext.Provider>
    );
};

export const useCarsContext = () => useContext(CarsContext);
