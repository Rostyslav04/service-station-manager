import axios from "axios";

export const searchRequest = (data: string) => {
    return axios({
        method: 'get',
        url: '/api/search',
        params: { data },
    });
};
