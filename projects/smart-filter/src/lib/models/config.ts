export class Config {
    public constructor(init?: Partial<Config>){
        Object.assign(this, init);
    }

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
    parentField: string = '';
    optionList: string[] | ObjectList[] = [];
    isDefault: boolean = false;
    searchOptions: SearchOption[] = [];
    selectedSearchOption: string = '';
}

export class FilterOptionMenu {
    public constructor(init?: Partial<FilterOptionMenu>){
        Object.assign(this, init);
    }

    _id: string = '';
    displayName: string = '';
}

export class ObjectList {
    public constructor(init?: Partial<ObjectList>){
        Object.assign(this, init);
    }

    _id: string = '';
    displayName: string = '';
}

export class SearchOption {
    public constructor(init?: Partial<SearchOption>){
        Object.assign(this, init);
    }

    key: string = '';
    name: string = '';
}

export class Filters {
    public constructor(init?: Partial<Filters>){
        Object.assign(this, init);
    }

    filters: Filter[] = [];
}

export class Filter {
    public constructor(init?: Partial<Filter>){
        Object.assign(this, init);
    }

    dbName: string = '';
	dataType: string = '';
	isCustome: boolean = false;
	parentField: string = '';
	isDefault: boolean = false;
	selectedSearchOption: string = '';
	values: string[] = [];
	additionalValue: string = '';
}

// TODO: type input
// export class FieldGroup {
//     public constructor(init?: Partial<FieldGroup>){
//         Object.assign(this, init);
//     }

//     _id:                  [''],
//     displayName:          [''],
//     dbName:               [''],
//     dataType:             [''],
//     isCustome:            [''],
//     parentField:          [''],
//     optionList:           [''],
//     isDefault:            [''],
//     searchOptions:        [''],
//     booleanOption:        ['true', Validators.required],
//     selectedSearchOption: ['', Validators.required],
//     value:                [''],
//     additionalValue:      [''],
//     values:               this._formBuilder.array([]),
//     filterSelected:       ['', Validators.required],
// }