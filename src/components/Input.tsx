'use client';

interface IProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    name: string;
    type: string;
}

const Input = ({ onChange, value, placeholder, name, type }: IProps) => (
    <>
        <div className={'form__group'}>
            <input
                type={type}
                className={'form__field'}
                placeholder={placeholder}
                name={name}
                id={name}
                autoComplete="off"
                value={value}
                onChange={onChange}
                required
            />
            <label htmlFor={name} className={'form__label'}>
                {placeholder}
            </label>
        </div>
    </>
);

export default Input;
