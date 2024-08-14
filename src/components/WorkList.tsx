import React, { useState } from 'react';
import Input from './Input';
import { ArrowSvg, Complete2, RecycleBinSvg } from '@/assets/svg';
import { deleteReq } from '@/services/todo';
import { useCarContext } from '@/contexts/CarContext';
import newDateComponent from './NewDate';
import { v4 } from 'uuid';
import Category from '@/components/Category';

interface IOption {
    label: string;
    name: string;
}

export const WorkList: React.FC = () => {
    const options = [
        { label: 'Кузов', name: 'body' },
        { label: 'Підвіска', name: 'transmission' },
        { label: 'Двигун', name: 'engine' },
        { label: 'Коробка передач', name: 'gear_box' },
        { label: 'Салон', name: 'salon' },
        { label: 'Рульове керування', name: 'steering' },
        { label: 'Навісне обладнання', name: 'attached_equipment' },
        { label: 'Гальма', name: 'brakes' },
    ];

    const [inputValue, setInputValue] = useState('');
    const { car, addCarTodo, setCarTodo, carTodo, updateCarTodoStatus, updateCarTodoTitle } = useCarContext();
    const [selectedOption, setSelectedOption] = useState<IOption>();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleAddTodo = () => {
        if (!car) return;
        if (!selectedOption) return;
        const newDate = newDateComponent;
        if (inputValue.trim() !== '') {
            setInputValue('');

            addCarTodo({
                carId: car.id,
                category: selectedOption.name,
                dateStart: newDate,
                dateEnd: '',
                id: v4(),
                status: 'working',
                title: inputValue.trim(),
            });
        }
    };

    const handleEditTodo = (id: string, title: string) => {
        if (!car) return;

        const findTodo = carTodo.find((item) => item.id === id);
        if (!findTodo) return;

        const updatedTodos = carTodo.map((todo) => {
            if (id === todo.id) {
                return { ...todo, title };
            }
            return todo;
        });

        setCarTodo(updatedTodos);
        updateCarTodoTitle({ ...findTodo, id, title, carId: car.id });
    };

    const removeTodo = async (carId: string, todoId: string) => {
        const todoToRemove = carTodo.find((todo) => todo.id === todoId);
        if (!todoToRemove) return;

        const updatedTodos = carTodo.filter((todo) => todo.id !== todoId);
        setCarTodo(updatedTodos);

        if (!car) return;
        try {
            await deleteReq({ todoId, carId });
        } catch (error) {
            console.error('Error deleting todo:', error);
            setCarTodo((prevTodos) => [...prevTodos, todoToRemove]);
        }
    };

    const handleOptionChange = (option: IOption) => {
        setSelectedOption(option);
    };

    const getLabelForCategory = (name: string) => {
        const option = options.find((option) => option.name === name);
        return option ? option.label : name;
    };

    const handleEditStatusTodo = (todoId: string) => {
        if (!car) return;
        setCarTodo((prevTodos) => {
            return prevTodos.map((todo) => {
                if (todo.id === todoId) {
                    const newStatus = todo.status === 'done' ? 'working' : 'done';
                    const newDateEnd = newStatus === 'done' ? newDateComponent : '';
                    const updatedTodo = {
                        ...todo,
                        status: newStatus,
                        dateEnd: newDateEnd,
                    };
                    updateCarTodoStatus({
                        id: todo.id,
                        title: todo.title,
                        status: newStatus,
                        dateStart: todo.dateStart,
                        dateEnd: newDateEnd,
                        category: todo.category,
                        carId: car.id,
                    });
                    return updatedTodo;
                }
                return todo;
            });
        });
    };

    if (!car) return null;

    return (
        <div>
            <div className="inputAndButton">
                <Category options={options} onOptionChange={handleOptionChange} />
                <Input
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Список робіт"
                    name="workList"
                    type="text"
                />
                <div onClick={handleAddTodo}>
                    <ArrowSvg className="buttonWorkList" rotate={180} />
                </div>
            </div>
            <div className="List">
                {carTodo.map((todo) => (
                    <div key={todo.id} className="InputList">
                        <div className="category">{getLabelForCategory(todo.category)}</div>
                        <input
                            type="text"
                            value={todo.title}
                            onChange={(e) => handleEditTodo(todo.id, e.target.value)}
                            className="taskWorkList"
                        />
                        <div className="completeButtonBox" onClick={() => handleEditStatusTodo(todo.id)}>
                            {todo.status === 'done' && <Complete2 className="completeButton" />}
                        </div>
                        <div className="date">
                            {todo.dateStart}/{todo.dateEnd}
                        </div>
                        <div onClick={() => removeTodo(car.id, todo.id)}>
                            <RecycleBinSvg className="RecycleBin" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WorkList;
