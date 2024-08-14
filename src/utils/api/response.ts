import {config} from "@/config";
import {NextResponse} from "next/server";

export const resBadRequest = (data?: any) => {
    const json = JSON.stringify({
        data: null,
        err: data ? data : config.api.res.badReq,
    });

    return new NextResponse(json, {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
    });
};