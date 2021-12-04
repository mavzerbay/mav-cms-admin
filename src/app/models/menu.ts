import { IApiResponse } from "../shared/models/api-response";
import { BaseModel } from "../shared/models/base-model";

export interface IMenu extends BaseModel, IApiResponse<IMenu> {
}

export class Menu implements BaseModel {
    id!: string;
    displayOrder!: number;
    activity!: boolean;
    routerLink!: string;
    routerQueryParameter!: string;
    icon!: string;
    backgroundImagePath!: string;
    isBackend!: boolean;
    menuPositionId!: string;
}

export class MenuTrans implements BaseModel {
    id!: string;

}