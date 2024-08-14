'use client';

import React from 'react';
import { AppProvider } from '@/contexts/AppContexts';
import { CarsProvider } from '@/contexts/CarsContexts';
import { CarProvider } from '@/contexts/CarContext';
import { CarSpendProvider } from '@/contexts/CarSpendContext';
import LayoutPage from '@/components/Layout';

interface IProps {
    children: React.ReactNode;
}

export default function Layout({ children }: IProps) {
    return (
        <AppProvider>
            <CarsProvider>
                <CarProvider>
                        <CarSpendProvider>
                            <></>
                            <LayoutPage>{children}</LayoutPage>
                        </CarSpendProvider>
                </CarProvider>
            </CarsProvider>
        </AppProvider>
    );
}
