interface IProps {
    status?: number;
}

export const serverSuccessHandler = (msg: string, opt?: IProps) => {
    const status = opt?.status || 200;

    return new Response(msg, { status, headers: { 'Content-Type': 'application/json' } });
};

export const serverErrorHandler = (msg: string, opt?: IProps) => {
    const status = opt?.status || 500;

    return new Response(msg, { status, headers: { 'Content-Type': 'application/json' } });
};
