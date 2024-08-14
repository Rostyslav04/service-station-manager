import axios from 'axios';

export const getCarsReq = () =>
    axios<ICars[]>({
        method: 'get',
        url: `/api/cars`,
    });

export const getCarReq = (id: string) =>
    axios<ICarNew>({
        method: 'get',
        url: `/api/car`,
        params: { id },
    });

export const getCarImgReq = (name: string) =>
    axios<Blob>({
        method: 'get',
        url: `/api/car/image`,
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob',
        params: { name },
    });

export const createCarImgReq = (name: File[]) =>
    axios<Blob>({
        method: 'POST',
        url: `/api/car/image`,
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob',
        params: { name },
    });

export const createCarReq = (data: ICarInfo) =>
    axios<ICarNew>({
        method: 'POST',
        url: `/api/car`,
        data,
    });

export const uploadCarImages = (img: any, carId: string) =>
    axios<string[]>({
        method: 'POST',
        url: `/api/car/image`,
        headers: { 'Content-Type': 'multipart/form-data' },
        data: img,
        params: {
            carId: carId,
        },
    });

export const deleteCarReq = (id: string) =>
    axios<ICarNew>({
        method: 'DELETE',
        url: '/api/car',
        params: { id },
    });

export const putReq = (data: ICarData) =>
    axios<ICarData>({
        method: 'PUT',
        url: '/api/car',
        data
    });

//
// TODO: delete after refactor
//

/**
 * @deprecated
 */
class CarServices {
    public async createReq(data: ICarCreateReq) {
        const res = await fetch('/api/car', { method: 'POST', body: JSON.stringify(data) });
        return (await res.json()) as ICarCreate;
    }

    public async putReq(data: ICarUpdateReq) {
        const res = await fetch('/api/car', { method: 'PUT', body: JSON.stringify(data) });
        return (await res.json()) as ICarUpdate;
    }

    public async deleteReq({ id }: ICarDeleteReq) {
        const res = await fetch(`/api/car?id=${id}`, { method: 'DELETE' });
        return (await res.json()) as ICarDelete;
    }

    public async getFile(imgId: string) {
        return axios({
            method: 'get',
            url: `/api/car/image`,
            headers: { 'Content-Type': 'multipart/form-data' },
            responseType: 'blob',
            params: {
                id: imgId,
            },
        });
    }

    public async getAllReq(imgId: any) {
        return axios({
            method: 'get',
            url: `/api/car/test`,
            params: {
                id: imgId,
            },
        });
    }
}

export const carServices = new CarServices();
