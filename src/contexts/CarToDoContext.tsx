'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAppContext } from '@/contexts/AppContexts';
import { toDoServices } from '@/services/todo';
import { useCarContext } from '@/contexts/CarContext';
import { carServices } from '@/services/carServices';

interface IProps {
    getAllTodos: (data: ICarTodo) => void;
    createTodo: (data: ITodoCreateReq) => void;
    setTodos: (data: React.SetStateAction<ICarTodo[]>) => void;
    todos: ICarTodo[];
    deleteTodo: (data: ITodoDeleteReq) => void;
}

interface IProviderProps {
    children: React.ReactNode;
}

export const CarToDoContext = createContext<IProps>(null!);

export const CarToDoProvider = ({ children }: IProviderProps) => {
    // @ts-ignore
    const [todos, setTodos] = useState<ITodo[]>([]);

    const { setIsLoading } = useAppContext();
    const { car } = useCarContext();

    useEffect(() => {
        if (!car) return;
        getAllTodos();
    }, [car]);

    const getAllTodos = async () => {
        if (!car) return;
        try {
            setIsLoading(true);

            const todos = await toDoServices.getAllTodo(car.id);
            setTodos(todos);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const createTodo = async (data: ITodoCreateReq) => {
        try {
            setIsLoading(true);

            const newTodo = await toDoServices.createReq(data);

            setTodos((prev) => {
                if (prev.length === 0) return prev;
                return [...prev, newTodo];
            });
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteTodo = async ({ todoId }: ITodoDeleteReq) => {
        if (!car) return;
        try {
            setIsLoading(true);
            // @ts-ignore
            await toDoServices.deleteReq({ todoId, carId: car.id});

            setTodos((prev) => prev.filter((todo) => todoId !== todo.id));
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <CarToDoContext.Provider
            value={{
                getAllTodos,
                createTodo,
                todos,
                setTodos,
                deleteTodo,
            }}
        >
            {children}
        </CarToDoContext.Provider>
    );
};

export const useCarToDoContext = () => useContext(CarToDoContext);
