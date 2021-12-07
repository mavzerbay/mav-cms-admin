import { IApiResponse } from "../shared/models/api-response";
import { BaseModel } from "../shared/models/base-model";

export interface ICategory extends BaseModel, IApiResponse<ICategory> {
}

export class Category implements BaseModel {
    id!: string;
    activity!:boolean;
    categoryTrans!: CategoryTrans[];
}

export class CategoryTrans implements BaseModel {
    id!: string;
    categoryId!: string;
    languageId!: string;
    name!: string;
    info!: string
}