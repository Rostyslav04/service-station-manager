'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    createCarImgReq,
    createCarReq,
    deleteCarReq,
    getCarImgReq,
    getCarReq,
    getCarsReq,
    putReq,
    uploadCarImages,
} from '@/services/carServices';
import { createCarToDoReq, deleteReq, putToDoReq } from '@/services/todo';
import { createSpendReq, deleteSpendReq, SpendsServices } from '@/services/spends';

interface IProviderProps {
    children: React.ReactNode;
}

const CarContext = createContext<IProps>(null!);

export const CarProvider = ({ children }: IProviderProps) => {
    const [cars, setCars] = useState<ICars[]>([]);
    const [car, setCar] = useState<ICarData | null>(null);
    const [carImg, setCarImg] = useState<ICarImg[]>([]);
    const [carTodo, setCarTodo] = useState<ICarTodo[]>([]);
    const [carSpends, setCarSpends] = useState<ICarSpend[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const [isLoading, setIsLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        getCars();
    }, []);

    const isProcessing = () => isLoading || isUpdating;

    const getCars = async () => {
        if (isProcessing()) return;
        setIsLoading(true);

        try {
            const res = await getCarsReq();
            const data: ICars[] = [];

            await Promise.all(
                res.data.map(async (item) => {
                    const carImages = await loadCarImg(item.img);
                    data.push({ id: item.id, info: item.info, img: carImages });
                }),
            );

            setCars(data);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const selectCar = async (id: string) => {
        if (isProcessing()) return;
        setIsLoading(true);

        try {
            const res = await getCarReq(id);
            const imgRes = await loadCarImg(res.data.img);

            setCar({
                id: res.data.id,
                info: res.data.info,
            });
            setCarTodo(res.data.todo);
            setCarSpends(res.data.spends);
            setCarImg(imgRes);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const loadCarImg = async (img: ICarImg[]) => {
        const res: ICarImg[] = [];

        const promises = img.map(async (item) => {
            try {
                const resImg = await getCarImgReq(item.name);
                res.push({ name: item.name, blob: resImg.data, localUrl: URL.createObjectURL(resImg.data) });
            } catch (e) {
                console.error(e);
            }
        });

        await Promise.all(promises);

        return res;
    };

    // TODO: implement func

    //
    // add
    //

    const addCar = async (data: ICarInfo, images: File[]) => {
        try {
            setIsLoading(true);

            const newCarRes = await createCarReq(data);

            const formData = new FormData();
            images.forEach((file) => {
                formData.append('files', file);
            });

            const uploadedImages = await uploadCarImages(formData, newCarRes.data.id);

            const carImages = await loadCarImg(uploadedImages.data.map((item) => ({ name: item })));

            setCars((prev) => [
                ...prev,
                {
                    id: newCarRes.data.id,
                    info: data,
                    img: carImages,
                },
            ]);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const addCarTodo = async (data: ICarTodo) => {
        try {
            setIsLoading(true);

            const newTodo = await createCarToDoReq(data);

            setCarTodo((prev) => [
                ...prev,
                {
                    id: newTodo.data.id,
                    title: newTodo.data.title,
                    status: newTodo.data.status,
                    category: newTodo.data.category,
                    dateStart: newTodo.data.dateStart,
                    dateEnd: newTodo.data.dateEnd,
                },
            ]);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const addCarSpend = async (data: ICarSpend_CarId) => {
        try {
            setIsLoading(true);

            const newSpends = await createSpendReq(data);

            setCarSpends((prev) => [
                ...prev,
                {
                    id: newSpends.data.id,
                    name: newSpends.data.name,
                    quantity: newSpends.data.quantity,
                    price: newSpends.data.price,
                    category: newSpends.data.category,
                    date: newSpends.data.date,
                },
            ]);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    //
    // update
    //

    const updateCarInfo = async ({ id, info }: ICarData) => {
        try {
            setIsLoading(true);

            const updatedCar = await putReq({ id, info });

            setCars((prev) => {
                return prev.map((car) => {
                    if (car.id === id) {
                        return {
                            ...car,
                            id: updatedCar.data.id,
                            info: updatedCar.data.info,
                        };
                    }
                    return car;
                });
            });
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const updateCarTodoTitle = async ({ id, title }: ICarTodo_CarId) => {
        try {
            setIsLoading(true);
            if (!car) return;
            const updatedTodo = await putToDoReq({
                id,
                title,
                carId: car.id,
            } as ICarTodo & { carId: string });

            setCarTodo((prev) =>
                prev.map((todo) => {
                    if (todo.id === id) {
                        return {
                            ...todo,
                            title: title,
                        };
                    }
                    return todo;
                }),
            );
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const updateCarTodoStatus = async ({ id, status, dateEnd, title }: ICarTodo_CarId) => {
        try {
            setIsLoading(true);
            if (!car) return;
            const updatedTodo = await putToDoReq({
                id,
                status,
                dateEnd,
                carId: car.id,
            } as ICarTodo & { carId: string });

            setCarTodo((prev) =>
                prev.map((todo) => {
                    if (todo.id === id) {
                        return {
                            ...todo,
                            status: status,
                            dateEnd: dateEnd,
                        };
                    }
                    return todo;
                }),
            );
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const updateCarSpend = async () => {};

    //
    // delete
    //

    const deleteCar = async ({ id }: ICarNew) => {
        if (isProcessing()) return;
        if (!car) return;
        setIsLoading(true);
        try {
            await deleteCarReq(id);

            setCars((prev) => prev.filter((car) => car.id !== id));
            setCar(null);
            setCarImg([]);
            setCarTodo([]);
            setCarSpends([]);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteCarTodo = async ({ todoId }: ICarDeleteTodo) => {
        if (isProcessing()) return;
        if (!car) return;
        setIsLoading(true);
        try {
            await deleteReq({ carId: car.id, todoId });

            setCarTodo((prev) => prev.filter((todo) => todoId !== todo.id));
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteCarImg = async () => {};

    return (
        <CarContext.Provider
            value={{
                cars,
                car,
                carImg,
                carTodo,
                carSpends,
                setCarSpends,
                setCarTodo,

                isLoading,
                isUpdating,

                selectCar,
                loadCarImg,

                // add
                addCar,
                addCarTodo,
                addCarSpend,

                // update
                updateCarInfo,
                updateCarTodoTitle,
                updateCarTodoStatus,
                updateCarSpend,

                // delete
                deleteCar,
                deleteCarTodo,
                deleteCarImg,
            }}
        >
            {children}
        </CarContext.Provider>
    );
};

interface IProps {
    cars: ICars[];
    car: ICarData | null;
    carImg: ICarImg[];
    carTodo: ICarTodo[];
    carSpends: ICarSpend[];
    setCarTodo: (data: React.SetStateAction<ICarTodo[]>) => void;
    setCarSpends: (data: React.SetStateAction<ICarSpend[]>) => void;

    isLoading: boolean;
    isUpdating: boolean;

    selectCar: (id: string) => void;
    loadCarImg: (img: ICarImg[]) => void;

    // add
    addCar: (data: ICarInfo, images: File[]) => Promise<void>;
    addCarTodo: (data: ICarTodo_CarId) => Promise<void>;
    addCarSpend: (data: ICarSpend_CarId) => Promise<void>;

    // update
    updateCarInfo: (car: ICarData) => Promise<void>;
    updateCarTodoTitle: (data: ICarTodo_CarId) => Promise<void>;
    updateCarTodoStatus: (data: ICarTodo_CarId) => Promise<void>;
    updateCarSpend: () => void;

    // delete
    deleteCar: (car: ICarNew) => Promise<void>;
    deleteCarTodo: (carTodo: ICarDeleteTodo) => Promise<void>;
    deleteCarImg: () => void;
}

export const useCarContext = () => useContext(CarContext);
