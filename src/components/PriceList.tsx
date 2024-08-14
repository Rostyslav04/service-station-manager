import React, { useState } from 'react';
import Input from '@/components/Input';
import { RecycleBinSvg, ArrowSvg } from '@/assets/svg';
import { useCarSpendsContext } from '@/contexts/CarSpendContext';
import { useCarContext } from '@/contexts/CarContext';
import { deleteSpendReq, SpendsServices } from '@/services/spends';
import { v4 } from 'uuid';
import Category from '@/components/Category';
import newDateComponent from '@/components/NewDate';

interface IOption {
    label: string;
    name: string;
}

const PriseList = () => {
    const options = [
        { label: 'Кузов', name: 'body' },
        { label: 'Підвіска', name: 'transmission' },
        { label: 'Двигун', name: 'engine' },
        { label: 'Коробка передач', name: 'gear_box' },
        { label: 'Салон', name: 'salon' },
        { label: 'Рульове керування', name: 'steering' },
        { label: 'Навісне обладнання', name: 'attached_equipment' },
        { label: 'Гальма', name: 'brakes' },
        { label: 'Розхідні матеріали', name: 'consumables' },
    ];
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const { car, addCarSpend, carSpends, setCarSpends } = useCarContext();
    const [selectedOption, setSelectedOption] = useState<IOption>();

    const handleAddSpend = () => {
        if (!car) return;
        if (!selectedOption) return;
        const newDate = newDateComponent;
        if (name.trim() !== '' && quantity.trim() !== '' && price.trim() !== '') {
            setName('');
            setQuantity('');
            setPrice('');
            addCarSpend({
                carId: car.id,
                id: v4(),
                name: name.trim(),
                price: price.trim(),
                quantity: quantity.trim(),
                category: selectedOption.name,
                date: newDate,
            });
        }
    };

    const handleEditName = (id: string, newText: string) => {
        const updatedSpends = carSpends.map((spend) => {
            if (spend.id === id) {
                return { ...spend, name: newText };
            }
            return spend;
        });
        setCarSpends(updatedSpends);
    };

    const handleEditNumber = (id: string, newText: string) => {
        const updatedSpends = carSpends.map((spend) => {
            if (spend.id === id) {
                return { ...spend, quantity: newText };
            }
            return spend;
        });
        setCarSpends(updatedSpends);
    };

    const handleEditPrice = (id: string, newText: string) => {
        const updatedSpends = carSpends.map((spend) => {
            if (spend.id === id) {
                return { ...spend, price: newText };
            }
            return spend;
        });
        setCarSpends(updatedSpends);
    };

    const removeSpend = async (spendId: string) => {
        if (!car) return;
        const SpendRemove = carSpends.find((spend) => spend.id === spendId);
        if (!SpendRemove) return;

        const updatedSpends = carSpends.filter((spend) => spend.id !== spendId);
        setCarSpends(updatedSpends);

        try {
            await deleteSpendReq({ spendId: spendId, carId: car.id });
        } catch (error) {
            console.error('Error deleting todo todo:', error);
            setCarSpends((prevTodos) => [...prevTodos, SpendRemove]);
        }
    };

    const handleOptionChange = (option: IOption) => {
        setSelectedOption(option);
    };

    const getLabelForCategory = (name: string) => {
        const option = options.find((option) => option.name === name);
        return option ? option.label : name;
    };

    const total = carSpends.reduce((acc, spend) => acc + parseFloat(spend.price), 0);

    return (
        <div>
            <div className="headPriceList">
                <div className="PriceListName">Витрати:</div>
                <div className="formPriceList">
                    <div className="inputSizeBox">
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Назва"
                            name="name"
                            type="text"
                        />
                    </div>
                    <div className="inputSizeBoxSmall">
                        <Input
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            placeholder="Кількість"
                            name="quantity"
                            type="text"
                        />
                    </div>
                    <div className="inputSizeBoxSmall">
                        <Input
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Ціна"
                            name="price"
                            type="text"
                        />
                    </div>
                    <div className={'category_margin'}>
                        <Category options={options} onOptionChange={handleOptionChange} />
                    </div>
                    <div onClick={handleAddSpend}>
                        <ArrowSvg className="buttonWorkList" rotate={180} />
                    </div>
                </div>
            </div>
            <div className="List">
                {carSpends.map((spend) => (
                    <div key={spend.id} className="InputList">
                        <div className="inputSizeBox">
                            <input
                                type="text"
                                value={spend.name}
                                onChange={(e) => handleEditName(spend.id, e.target.value)}
                                className="taskWorkList"
                            />
                        </div>
                        <div className="inputSizeBoxSmall">
                            <input
                                type="text"
                                value={spend.quantity}
                                onChange={(e) => handleEditNumber(spend.id, e.target.value)}
                                className="taskWorkList"
                            />
                        </div>
                        <div className="inputSizeBoxSmall">
                            <input
                                type="text"
                                value={spend.price}
                                onChange={(e) => handleEditPrice(spend.id, e.target.value)}
                                className="taskWorkList"
                            />
                        </div>
                        <div className="category">{getLabelForCategory(spend.category)}</div>
                        <div className="datePriceList">{spend.date}</div>
                        <div onClick={() => removeSpend(spend.id)}>
                            <RecycleBinSvg className="RecycleBin" />
                        </div>
                    </div>
                ))}
            </div>
            <div className="totalPrice">
                Загальна ціна: <div className="cardInvested">{total.toFixed(2)}</div>
            </div>
        </div>
    );
};

export default PriseList;
