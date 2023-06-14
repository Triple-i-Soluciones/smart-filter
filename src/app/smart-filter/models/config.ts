export class Config {

    public constructor(init?: Partial<Config>){
        Object.assign(this, init);
    }

    filterOptionsMenu: filterOptionMenu[] = [];
    fields: Field[] = [];
     
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
    optionList: string[] = [];
    isDefault: boolean = false;
     
}

export class filterOptionMenu {

    public constructor(init?: Partial<Field>){
        Object.assign(this, init);
    }

    _id: string = '';
    displayName: string = '';
     
}