import { IApiResponse } from "./api-response";
import { BaseModel } from "./base-model";

export class CrudLayoutOptions<T> {
    url!: string;
    cols!: CrudLayoutColumns[];
    model?: T;
    showToolBar?: boolean = true;
    showSearch?: boolean = true;
    dialogComponent: any;
    dialogHeader!: string;
    dialogWidth?: string = '60%';
    contentStyle?: any = { "max-height": "500px", "overflow": "auto" };
}

export class CrudLayoutColumns {
    /**
     * modeldeki ismi yazılmalı pSortable ve field alanlarında kullanmak için
     * field ismi crudButtons olursa o alanda güncelle-sil butonları görünür.
     */
    field!: string;
    /**
     * Headerda kullanılacak isim
     */
    fieldHeaderName!: string;
    /**
     * Filtreleme headerı tipi örn:none,text,number,autocomplete,trueFalse
     */
    type!: string;
    autoCompleteUrl?: string;
    isGlobalFilter?: boolean = false;
}