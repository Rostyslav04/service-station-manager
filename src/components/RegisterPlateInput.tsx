import React from 'react';

interface IProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RegisterPlateInput: React.FC<IProps> = ({ onChange, value }) => {
    return (
        <div className={'PlateBlock'}>
            <div className={'registerPlateBlue'}>
                <div className={'registerPlateFlag'}>
                    <div className={'registerPlateFlagBlue'}></div>
                    <div className={'registerPlateFlagYellow'}></div>
                </div>
                <div className={'registerPlateUA'}>UA</div>
            </div>
            <div className={'registerPlateText'}>
                <div className={'inputCenter'}>
                    <input
                        type="text"
                        value={value}
                        onChange={onChange} // Змінено на передачу обробника подій
                        className={'inputPlate'}
                        autoComplete="off"
                        required
                    />
                </div>
            </div>
        </div>
    );
};

export default RegisterPlateInput;
