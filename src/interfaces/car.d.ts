type TodoStatus = 'backlog' | 'inProgress' | 'isDone';
type CarStatus = 'backlog' | 'inProgress' | 'isDone';

type ICarInfo = {
    brand: string;
    model: string;
    year: string;
    registerPlate: string;
    price: string;
    soldPrice: string;
    buyDate: string;
    startWorkDate: string | null;
    status: CarStatus | string;
    endWorkDate: string;
    soldDate: string;
};

type ICarTodo = {
    id: string;
    title: string;
    status: TodoStatus | string;
    category: string;
    dateStart: string;
    dateEnd: string;
};

type ICarDeleteTodo = {
    todoId: string;
    carId: string;
};

type ICarDeleteSpend = {
    spendId: string;
    carId: string;
};

type ICarSpend_CarId = ICarSpend & {
    carId: string;
};

type ICarSpend = {
    id: string;
    price: string;
    name: string;
    quantity: string;
    category: string;
    date: string;
};

type ICarImg = {
    blob?: Blob;
    localUrl?: string;
    name: string;
};

type ICarWithoutId = {
    todo: ICarTodo[];
    spends: ICarSpend[];
    info: ICarInfo;
    img: ICarImg[];
};

// TODO: rename  after refactor
type ICarNew = { id: string } & ICarWithoutId;

type ICarData = {
    id: string;
    info: ICarInfo;
};

type ICars = {
    id: string;
    info: ICarInfo;
    img: ICarImg[];
};

type ICarTodo_CarId = ICarTodo & {
    carId: string;
};

//
//
//

interface ICar {
    id: string;
    todo: ITodo[];
    spends: ICarSpend[];
    img: string[];
    brand: string;
    model: string;
    year: string;
    registerPlate: string;
    price: string;
    soldPrice: string;
    buyDate: string;
    startWorkDate: string | null;
    status: string;
    endWorkDate: string;
    soldDate: string;
}

// GET ALL
interface ICarGetAll extends Omit<ICar, 'todo' | 'spends' | 'soldDate' | 'endWorkDate' | 'soldPrice' | 'img'> {}

// GET By id
interface ICarGetByIdReq extends Pick<ICar, 'id'> {}

interface ICarGetById extends Omit<ICar, 'todo'> {}

// Create
interface ICarCreateReq extends Omit<ICar, 'todo' | 'spends' | 'id'> {}

interface ICarCreate extends Pick<ICar, 'id'> {}

interface ICarCreateTodo extends Pick<ICar, 'todo' | 'id'> {}

// Update
interface ICarUpdate extends Pick<ICar, 'id'> {}

// Delete
interface ICarDeleteReq extends Pick<ICar, 'id'> {}

interface ICarDelete extends Pick<ICar, 'id'> {}
