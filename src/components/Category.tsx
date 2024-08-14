import React, { useState } from 'react';
import { useCarContext } from '@/contexts/CarContext';

interface IOption {
    label: string;
    name: string;
}

interface ICategoryProps {
    options: IOption[];
    onOptionChange: (option: IOption) => void;
}

const Category: React.FC<ICategoryProps> = ({ options, onOptionChange }) => {
    const { car } = useCarContext();
    const [selectedOption, setSelectedOption] = useState<IOption | null>(null);

    const handleOptionChange = (option: IOption) => {
        if (!car) return;
        setSelectedOption(option);
        onOptionChange(option);
    };

    return (
        <div>
            <select
                className={'selectBox'}
                value={selectedOption?.name || ''}
                onChange={(e) => {
                    const selectedValue = e.target.value;
                    const selectedOption = options.find((option) => option.name === selectedValue);
                    if (selectedOption) {
                        handleOptionChange(selectedOption);
                    }
                }}
            >
                <option value="">Категорія</option>
                {options.map((option) => (
                    <option key={option.name} value={option.name} className={'select'}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Category;
