// interface ISpends {
//     id: string;
//     name: string;
//     quantity: string;
//     price: string;
// }

// GET By id
interface ISpendsGetByIdReq extends Pick<ISpends, 'id'> {}

interface ISpendsGetById {
    carId: string;
    id: string;
    name: string;
    quantity: string;
    price: string;
}

// Create
interface ISpendsCreateReq extends Pick<ISpends, 'name', 'quantity', 'price'> {
    carId: string;
}

interface ISpendsCreate extends Pick<ISpends, 'id', 'title'> {}

// Update
interface ISpendsUpdateReq extends Omit<ISpends, 'title'> {}

interface ISpendsUpdate extends Pick<ISpends, 'id'> {}

// Delete
interface ISpendsDeleteReq {
    spendId: string;
    carId: string;
}

interface ISpendsDelete extends Pick<ISpends, 'id'> {}
