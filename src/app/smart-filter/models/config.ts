export class Config {

    public constructor(init?: Partial<Config>){
        Object.assign(this, init);
    }

    filterOptionsMenu: filterOptionMenu[] = [];
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
    queryOptions: string[] = [];
}

export class filterOptionMenu {

    public constructor(init?: Partial<Field>){
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