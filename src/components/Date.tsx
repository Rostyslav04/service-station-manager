import React, { useState } from 'react';
import { useCarContext } from '@/contexts/CarContext';

export const Date: React.FC = () => {
    const [inputDate, setInputDate] = useState('');

    // const { updateCar } = useCarContext();
    const { car } = useCarContext();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setInputDate(e.target.value);
    };

    const handleSubmit = async () => {
        if (!car) return;

        try {
            // updateCar({ id: car.id, startWorkDate: inputDate });
            window.location.reload();
        } catch (error) {
            console.error('Error adding car:', error);
        }
    };

    return (
        <>
            <div className="dateBlock">
                <input type="date" value={inputDate} onChange={handleChange} className="selectedDate" />
                <div className="dateBlockButton">
                    <button onClick={handleSubmit} className="button">
                        Встановити дату
                    </button>
                </div>
            </div>
        </>
    );
};
