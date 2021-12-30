import { IApiResponse } from "../shared/models/api-response";
import { BaseModel } from "../shared/models/base-model";

export interface IPage extends BaseModel, IApiResponse<IPage> {
}

export class Page implements BaseModel {
    id!: string;
    activity!: boolean;
    parentPageId!: string;
    parentPage!: any;
    categoryId!: string;
    category!: any;
    pageTypeId!: string;
    pageType!: any;
    pageTrans!: PageTrans[];
}

export class PageTrans implements BaseModel {
    id!: string;
    pageId!: string;
    languageId!: string;
    name!: string;
    slug!: string;
    summary!: string;
    content!: string;
    headerPath!: string;
    backgroundPath!: string;
    ogTitle!: string;
    ogDescription!: string;
    ogImagePath!: string;
    ogType!: string;
}