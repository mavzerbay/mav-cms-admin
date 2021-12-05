import { IApiResponse } from "../shared/models/api-response";
import { BaseModel } from "../shared/models/base-model";

export interface ILanguage extends BaseModel, IApiResponse<ILanguage> {
}

export class Language implements BaseModel {
    id!: string;
    name!: string;
    culture!: string;
    flagIcon!: string;
    isRTL!: boolean;
    activity!: boolean;
    isPrimary!: boolean;
    displayOrder!: number;
}