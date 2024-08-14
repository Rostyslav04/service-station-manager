import React, { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { createPortal } from 'react-dom';
import { searchRequest } from '@/services/searchServices';
import Input from '@/components/Input';

interface IProps {
    isActive: boolean;
    onClose: () => void;
}

export const Search: React.FC<IProps> = ({ isActive, onClose }) => {
    const [search, setSearch] = useState('');
    const [isMounted, setIsMounted] = useState(false);
    const debounce = useDebounce(search);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        onSubmit();
    }, [debounce]);

    const onSubmit = async () => {
        try {
            if (!debounce) return;
            await searchRequest(debounce);
        } catch (err) {
            console.error(err);
        }
    };

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const onCloseHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        onClose();
    };

    if (!isMounted || !isActive) return <></>;

    return createPortal(
        <>
            <div className="closeSearch" onClick={onCloseHandler}>
                <div className="search" onClick={e => e.stopPropagation()}>
                    <Input
                        value={search}
                        onChange={onChangeHandler}
                        type={'text'}
                        name={'search'}
                        placeholder={'Пошук...'}
                    />
                </div>
            </div>
        </>,
        (document.getElementById('root-modal') as Element) || undefined,
    );
};
