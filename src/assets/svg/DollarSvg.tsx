interface IProps {
    className?: string;
}

export const DollarSvg = (props: IProps) => {
    const {className} = props

    return (
        <>
            <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                 stroke="currentcolor" fill="currentcolor" strokeWidth="1.2">

                <g id="SVGRepo_bgCarrier" strokeWidth="0"/>

                <g id="SVGRepo_tracerCarrier" strokeLinejoin="round" strokeLinecap="round"/>

                <g id="SVGRepo_iconCarrier">

                    <path
                        d="M8,16a1,1,0,0,0-2,0,5.006,5.006,0,0,0,5,5v1a1,1,0,0,0,2,0V21a5,5,0,0,0,0-10V5a3,3,0,0,1,3,3,1,1,0,0,0,2,0,5.006,5.006,0,0,0-5-5V2a1,1,0,0,0-2,0V3a5,5,0,0,0,0,10v6A3,3,0,0,1,8,16Zm5-3a3,3,0,0,1,0,6ZM8,8a3,3,0,0,1,3-3v6A3,3,0,0,1,8,8Z"/>

                </g>

            </svg>

        </>
    )
}