import axios from 'axios';

export const createSpendReq = (data: ICarSpend) =>
    axios<ICarSpend>({
        method: 'POST',
        url: `/api/spends`,
        data,
    });

export const deleteSpendReq = (data: ICarDeleteSpend) =>
    axios<ICarSpend>({
        method: 'DELETE',
        url: '/api/spends',
        data,
    });

class Spends {
    public async getAllSpend(id: string) {
        const res = await fetch(`/api/spends?id=${id}`, { method: 'GET' });
        return await res.json();
    }

    public async putReq() {
        const res = await fetch('/api/spends', { method: 'PUT' });
        return await res.json();
    }
}

export const SpendsServices = new Spends();
