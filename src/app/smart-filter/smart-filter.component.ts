import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { Config, Field, filterOptionMenu } from './models/config';

export class UserComponent {
  user = new FormGroup({
    name: new FormControl(''),
    skills: new FormArray([])
  });
}

@Component({
  selector: 'app-smart-filter',
  templateUrl: './smart-filter.component.html',
  styleUrls: ['./smart-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmartFilterComponent {
  @Input() config: Config = new Config();

  filterForm: FormGroup = this._formBuilder.group({
    config: "Aquí van las configs",
    filters: this._formBuilder.array([]),
  });

  filterOptionsMenu: FormControl = this._formBuilder.control('');
  queryOptionsMenu: FormControl = this._formBuilder.control('');

  constructor(
    private _formBuilder: FormBuilder,
  ) {}

  ngOnInit() {

    // this.filterMenuOption = this.config.fields.map(filter => {
    //   return {
    //     _id: filter._id,
    //     displayName: filter.displayName,
    //   }
    // })

    // this.fitlerOptionsMenu = this._formBuilder.

  }

  /**
   * string: contenga, no contenga, esté vacío
   * date: mayor que, menor que, entre, mayor o igual que, menor o igual que, vacío, igual a, diferente de
   * number: 
   * 
   * 
   * 
   */


  get filters(): FormArray {
    return this.filterForm.controls["filters"] as FormArray;
  }

  addFilter() {
    const filter = this._formBuilder.group({
      _id: [''],
      displayName: [''],
      dbName: [''],
      dataType: [''],
      isCustome: [''],
      optionList: [''],
      isDefault: [''],
      filterOperator: [''],
    });
    this.filters.push(filter);
  }

  seFilterValue(field: Field, filterIndex: number) {

    let filters: FormArray;
    filters = this.filters as FormArray
    filters.at(filterIndex).setValue(field);
  }

  getQueryOptions(fieldType: string) {
console.log("getQueryOptions", fieldType)
    const index = this.config.queryOptions.findIndex(option => option.type === fieldType);

    if (index === -1) {
      return []
    } 

    return this.config.queryOptions[index].options;
  }

  QueryOptionsChange(field: Field, filterIndex: number) {
    console.log(field)

    this.seFilterOperatorValue(field, filterIndex)
    
  }

  seFilterOperatorValue(field: Field, filterIndex: number) {

    let filters: FormArray;
    filters = this.filters as FormArray
    filters.at(filterIndex).get('filterOperator');
  }



  deleteFilter(filterIndex: number) {
    this.filters.removeAt(filterIndex);
  }

  filterOptionsChange(field: Field, filterIndex: number) {
    console.log(field)

    this.seFilterValue(field, filterIndex)
    
  }

  setOption() {

  }
  
}
