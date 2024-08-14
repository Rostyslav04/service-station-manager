interface IProps {
    className?: string;
}

export const MenuSvg = (props: IProps) => {
    const {className} = props

    return (
        <>
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" className={className}
                 width="800.000000pt" height="800.000000pt" viewBox="0 0 800.000000 800.000000"
                 preserveAspectRatio="xMidYMid meet">

                <g transform="translate(0.000000,800.000000) scale(0.100000,-0.100000)"
                   fill="#9BA2AB" stroke="none">
                    <path d="M883 6486 c-219 -53 -383 -261 -383 -486 0 -230 172 -442 398 -489
75 -16 6129 -16 6204 0 226 47 398 259 398 489 0 230 -172 442 -398 489 -81
17 -6148 14 -6219 -3z"/>
                    <path d="M883 4486 c-219 -53 -383 -261 -383 -486 0 -230 172 -442 398 -489
75 -16 6129 -16 6204 0 226 47 398 259 398 489 0 230 -172 442 -398 489 -81
17 -6148 14 -6219 -3z"/>
                    <path d="M883 2486 c-219 -53 -383 -261 -383 -486 0 -230 172 -442 398 -489
75 -16 6129 -16 6204 0 226 47 398 259 398 489 0 230 -172 442 -398 489 -81
17 -6148 14 -6219 -3z"/>
                </g>
            </svg>
        </>
    )
}