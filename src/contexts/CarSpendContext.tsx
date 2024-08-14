'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAppContext } from '@/contexts/AppContexts';
import { createSpendReq, deleteSpendReq, SpendsServices } from '@/services/spends';
import { useCarContext } from '@/contexts/CarContext';

interface IProps {
    getAllSpends: (data: ISpends) => void;
    createSpends: (data: ICarSpend) => void;
    setSpends: (data: React.SetStateAction<ISpends[]>) => void;
    spends: ISpends[];
    deleteSpend: (spendId: string) => void;
}

interface IProviderProps {
    children: React.ReactNode;
}

export const CarSpendsContext = createContext<IProps>(null!);

export const CarSpendProvider = ({ children }: IProviderProps) => {
    const [spends, setSpends] = useState<ISpends[]>([]);

    const { setIsLoading } = useAppContext();
    const { car } = useCarContext();

    useEffect(() => {
        if (!car) return;
        getAllSpends();
    }, [car]);

    const getAllSpends = async () => {
        if (!car) return;
        try {
            setIsLoading(true);

            const spends = await SpendsServices.getAllSpend(car.id);
            setSpends(spends);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const createSpends = async (data: ICarSpend) => {
        try {
            setIsLoading(true);

            const newSpends = await createSpendReq(data);

            // @ts-ignore
            setSpends((prev) => {
                if (prev.length === 0) return prev;
                return [...prev, newSpends];
            });
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteSpend = async (spendId: string) => {
        if (!car) return;
        try {
            setIsLoading(true);
            await deleteSpendReq({ spendId, carId: car.id });

            setSpends((prev) => prev.filter((spend) => spendId !== spend.id));
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <CarSpendsContext.Provider
            value={{
                getAllSpends,
                createSpends,
                spends,
                setSpends,
                deleteSpend,
            }}
        >
            {children}
        </CarSpendsContext.Provider>
    );
};

export const useCarSpendsContext = () => useContext(CarSpendsContext);
