interface IProps {
    className?: string;
    rotate?: number;
    onClick?: () => void;
}

export const ArrowSvg = (props: IProps) => {
    const { className, rotate } = props;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            style={{
                transform: `rotate(${rotate}deg)`,
            }}
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            imageRendering="optimizeQuality"
            fillRule="evenodd"
            clipRule="evenodd"
            viewBox="0 0 512 512"
        >
            <path
                fillRule="nonzero"
                d="M256 0c70.67 0 134.68 28.66 181.01 74.99C483.34 121.31 512 185.32 512 256c0 70.68-28.66 134.69-74.99 181.01C390.68 483.34 326.67 512 256 512c-70.68 0-134.69-28.66-181.01-74.99C28.66 390.69 0 326.68 0 256c0-70.67 28.66-134.68 74.99-181.01C121.31 28.66 185.32 0 256 0zm21.21 204.29h67.04c7.54 0 13.72 6.19 13.72 13.73v75.96c0 7.53-6.17 13.72-13.72 13.72h-67.03v42.84c0 16.5-19.63 24.78-31.54 13.86l-110.57-94.74c-9-7.44-9-21.03-.36-28.66l111.31-93.71c12.26-10.69 31.14-1.64 31.15 14.19v42.81zM413.23 98.77C372.99 58.54 317.39 33.66 256 33.66c-61.4 0-117 24.88-157.23 65.11C58.54 139.01 33.66 194.6 33.66 256c0 61.4 24.88 117 65.11 157.23C139 453.45 194.6 478.34 256 478.34c61.39 0 116.99-24.89 157.23-65.11C453.45 373 478.34 317.4 478.34 256c0-61.4-24.89-117-65.11-157.23z"
            />
        </svg>
    );
};
