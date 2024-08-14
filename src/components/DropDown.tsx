import React, { useEffect, useState } from 'react';
import { useCarContext } from '@/contexts/CarContext';
import { info } from 'sass';

interface Option {
    label: string;
}

const Dropdown: React.FC<{ options: Option[] }> = ({ options }) => {
    const { updateCarInfo, car } = useCarContext();
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);

    useEffect(() => {
        if (!selectedOption || !car) return;
        if (selectedOption.label === car.info.status) return;

        const handleOptionChange = (option: Option) => {
            if (!car) return;

            updateCarInfo({ id: car.id, info: { ...car.info, status: selectedOption.label } });
        };


        handleOptionChange(selectedOption);
    }, [selectedOption]);

    return (
        <div>
            <select
                className={'selectBox'}
                value={selectedOption?.label || ''}
                onChange={(e) => {
                    const selectedValue = e.target.value;
                    const selectedOption = options.find((option) => option.label === selectedValue);
                    setSelectedOption(selectedOption || null);
                }}
            >
                <option value="">Виберіть значення</option>
                {options.map((option) => (
                    <option key={option.label} value={option.label} className={'select'}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;
