export class Config {

    public constructor(init?: Partial<Config>){
        Object.assign(this, init);
    }

    fields: Field[] = [];
    queryOptions: QueryOption[] = [];

}

export class Field {

    public constructor(init?: Partial<Field>){
        Object.assign(this, init);
    }

    _id: string = '';
    displayName: string = '';
    dbName: string = '';
    dataType: string = '';
    isCustome: boolean = false;
    optionList: string[] | ObjectList[] = [];
    isDefault: boolean = false;
    searchOptions: string[] = [];
    selectedSearchOption: string = '';
}

export class FilterOptionMenu {

    public constructor(init?: Partial<FilterOptionMenu>){
        Object.assign(this, init);
    }

    _id: string = '';
    displayName: string = '';
     
}

export class QueryOption {

    public constructor(init?: Partial<Field>){
        Object.assign(this, init);
    }

    type: string = '';
    options: string[] = [];
     
}

export class ObjectList {

    public constructor(init?: Partial<ObjectList>){
        Object.assign(this, init);
    }

    _id: string = '';
    displayName: string = '';
}