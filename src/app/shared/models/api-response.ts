import { BaseModel } from "./base-model";

export interface IApiResponse<T extends BaseModel> {
    isSuccess: boolean;
    statusCode: number;
    pageIndex: number;
    pageSize: number;
    count: number;
    message: string;
    dataSingle: T;
    dataMulti: T[];
}