import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Config, Field } from './models/config';

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

  range!: FormGroup;

  filterField: FormControl = this._formBuilder.control('');
  queryOptionsMenu: FormControl = this._formBuilder.control('');

  constructor(
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit() {

    this.range = new FormGroup({
      start: new FormControl(),
      end: new FormControl()
    });

  }

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
      selectedSearchOption: [''],
      searchOptions: [''],
      values: [''],
      // values: this._formBuilder.array([]),
    });

    // ToDo: check
    // filter.get("displayName")?.valueChanges.subscribe(() =>{
    //   filter.get("value")?.setValue("");
    //   filter.get("selectedSearchOption")?.setValue("");
    // })

    this.filters.push(filter);
  }

  // setValue(filterIndex: number) {

  //   const valueArray: FormArray = this.filters.at(filterIndex).get('values') as FormArray;

  //   valueArray.push(this.filters.at(filterIndex).get('value'))
  // }

  // setQueryOptions(fieldType: string) {
  //   console.log("getQueryOptions", fieldType)
  //   const index = this.config.queryOptions.findIndex(option => option.type === fieldType);

  //   if (index === -1) {
  //     return []
  //   }

  //   return this.config.queryOptions[index].options;
  // }

  // getQueryOptions(fieldType: string) {
  //   console.log("getQueryOptions", fieldType)
  //   const index = this.config.queryOptions.findIndex(option => option.type === fieldType);

  //   if (index === -1) {
  //     return []
  //   }

  //   return this.config.queryOptions[index].options;
  // }

  // QueryOptionsChange(field: Field, filterIndex: number) {
  //   console.log(field)

  //   this.seselectedSearchOptionValue(field, filterIndex)

  // }

  // seselectedSearchOptionValue(field: Field, filterIndex: number) {

  //   let filters: FormArray;
  //   filters = this.filters as FormArray
  //   filters.at(filterIndex).get('selectedSearchOption');
  // }

  deleteFilter(filterIndex: number) {
    this.filters.removeAt(filterIndex);
  }

  filterFieldChange(field: Field, filterIndex: number) {
    this.setFilterValue(field, filterIndex)
  }

  setFilterValue(field: Field, filterIndex: number) {
    this.filters.at(filterIndex).patchValue(field);
  }

  setDates(filterIndex: number, date: string) {
    console.log(this.range.value)
  }

  filter() {
    const form = this.filterForm.getRawValue();
    console.log("form filters", form.filters) 
  }

  setInputValue(event: any) {
    // Prueba para meter los valores en un array
    console.log(event)
  }

}
