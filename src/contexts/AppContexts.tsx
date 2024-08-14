'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface IProps {
    isLoading: boolean;
    setIsLoading: (data: React.SetStateAction<boolean>) => void;
}

interface IProviderProps {
    children: React.ReactNode;
}

const AppContext = createContext<IProps>(null!);

export const AppProvider = (props: IProviderProps) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <AppContext.Provider
            value={{
                isLoading,
                setIsLoading,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
