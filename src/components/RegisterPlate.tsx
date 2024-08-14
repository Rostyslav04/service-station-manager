import React from 'react';

interface IProps {
    RegisterPlate: string;
}

export default function RegisterPlate({ RegisterPlate }: IProps) {
    return (
        <div className={'PlateBlock'}>
            <div className={'registerPlateBlue'}>
                <div className={'registerPlateFlag'}>
                    <div className={'registerPlateFlagBlue'}></div>
                    <div className={'registerPlateFlagYellow'}></div>
                </div>
                <div className={'registerPlateUA'}>UA</div>
            </div>
            <div className={'registerPlateText'}>{RegisterPlate}</div>
        </div>
    );
}
