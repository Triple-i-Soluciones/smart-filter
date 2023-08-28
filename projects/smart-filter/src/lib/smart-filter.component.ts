import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Config, Field, Filter } from './models/config';

interface FilterField extends Field {
  available: boolean;
}

@Component({
  selector: 'app-smart-filter',
  templateUrl: './smart-filter.component.html',
  styleUrls: ['./smart-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmartFilterComponent {
  @Input() config: Config = new Config();
  @Output() filterEvent: EventEmitter<Filter[]> = new EventEmitter<Filter[]>();

  filterForm: FormGroup = this._formBuilder.group({
    filters: this._formBuilder.array([]),
  });

  range!: FormGroup;
  fields: FilterField[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {

    this.fields = structuredClone(this.config.fields).map((field: Field) => {
      return {
        ...field,
        available: true,
      }
    });

    this.range = new FormGroup({
      start: new FormControl([ Validators.required]),
      end: new FormControl([Validators.required]),
    });

  }

  get filters(): FormArray {
    return this.filterForm.controls["filters"] as FormArray;
  }

  addFilter(): void {     
    const filter = this._formBuilder.group({
      _id:                  [''],
      displayName:          [''],
      dbName:               [''],
      dataType:             [''],
      isCustome:            [''],
      parentField:          [''],
      optionList:           [''],
      isDefault:            [''],
      searchOptions:        [''],
      booleanOption:        ['true', Validators.required],
      selectedSearchOption: ['', Validators.required],
      value:                ['', Validators.required],
      additionalValue:      [''],
      values:               this._formBuilder.array([]),
      filterSelected:       ['', Validators.required],
    });
    
    this.filters.push(filter);
  }
 
  deleteFilter(filterIndex: number): void {
    this.filters.removeAt(filterIndex);

    this.checkFiltersAvailability();
  }

  filterSelectedChange(field: Field, filterIndex: number): void {
    this.setFilterValue(field, filterIndex);
  }

  setFilterValue(field: Field, filterIndex: number): void {
    const filterId: string = this.filters.at(filterIndex).value._id;
    if (filterId !== '') {
      this.resetFilterValues(filterIndex);
    }
    
    this.filters.at(filterIndex).patchValue(field);

    this.checkFiltersAvailability();
  }

  resetFilterValues(filterIndex: number): void {
    this.filters.at(filterIndex).get('value')?.setValue('');
    this.filters.at(filterIndex).get('additionalValue')?.setValue('');

    const valuesArray: FormArray = this.filters.at(filterIndex).get('values') as FormArray;
    this.resetFormArrays(valuesArray);
  }

  resetFormArrays(formArray: FormArray): void {
    formArray.clear();
    formArray.controls.forEach((control) => {
      if (control instanceof FormArray) {
        this.resetFormArrays(control);
      }
    });
  }

  filter(): void {
    const form = this.filterForm.getRawValue();
    if (!this.filterForm.valid || this.filters.length === 0){
      this.filterForm.markAllAsTouched();
      return;
    }

    const filters: Filter[] = this.buildFilters(form.filters);
    // console.log(JSON.stringify(filters))
    this.filterEvent.emit(filters);
  }

  buildFilters(formFilters: any[]): Filter[] {
    return formFilters.map(formFilter => {
      return new Filter({
        dbName: formFilter.dbName,
        dataType: formFilter.dataType,
        isCustome: formFilter.isCustome,
        parentField: formFilter.parentField,
        isDefault: formFilter.isDefault,
        selectedSearchOption: formFilter.selectedSearchOption,
        values: formFilter.values,
        additionalValue: formFilter.additionalValue,
      })
    })
  }

  setInputValue(event: any, filterIndex: number, dataType: string): void {

    const value: string | number = event.target.value;

    const valuesArray: FormArray = this.filters.at(filterIndex).get('values') as FormArray;

    if (valuesArray.length > 0) {
      valuesArray.clear()
    }
    valuesArray.push(this._formBuilder.control(value));
  }

  setSecondInputValue(event: any, filterIndex: number, dataType: string): void {

    const value: string | number = event.target.value;

    const valuesArray: FormArray = this.filters.at(filterIndex).get('values') as FormArray;

    if (valuesArray.length > 1) {
      valuesArray.removeAt(1);
    }
    valuesArray.push(this._formBuilder.control(value));
  }

  setDateValue(event: any, filterIndex: number, filterOption: string, dateRange?: string): void{

    const value: string = event.target.value;

    //restart form validators if date range is selected more than once
    if(this.range.get('end')?.value == null){
      this.range.get('end')?.setValue(FormGroup, Validators.required)      
    } 
    
    const valuesArray: FormArray = this.filters.at(filterIndex).get('values') as FormArray;

    if (valuesArray.length > 0 && filterOption !== "entre") valuesArray.clear();
    
    if ((valuesArray.length > 0 && dateRange==="start")) valuesArray.clear();

    if (value !== null) valuesArray.push(this._formBuilder.control(value));
  }

  setDropdownElementChange(value: any, filterIndex: number, dataType: string): void{
    const valuesArray: FormArray = this.filters.at(filterIndex).get('values') as FormArray;
    valuesArray.clear();

    value.forEach((selectedOption:string)=>{
      valuesArray.push(this._formBuilder.control(selectedOption));
    })   
  }

  setMultiDropdownElementChange(values: string[], filterIndex: number, dataType: string): void{
    let valuesArray: FormArray = this.filters.at(filterIndex).get('values') as FormArray;
    valuesArray.clear();

    for (let val of values) {
      valuesArray.push(this._formBuilder.control(val));
    }   
  }

  searchOptionSelectedChange(filterIndex: number): void {
    this.checkForEmptyOptionSelected(filterIndex);
    this.checkForBothOptionSelected(filterIndex);
  }

  betweenOptionValidation(filterIndex: number): void{
    if (this.filters.at(filterIndex).get('selectedSearchOption')?.value === 'btwn' && this.filters.at(filterIndex).get('dataType')?.value !== 'date'){
      this.filters.at(filterIndex).get('additionalValue')?.setValidators([Validators.required]);
    }
  }

  checkForEmptyOptionSelected(filterIndex: number): void {
    const isEmptySelected: boolean = this.filters.at(filterIndex).get('selectedSearchOption')?.value === 'empty';

    if(isEmptySelected) {
      this.resetFilterValues(filterIndex);
      this.disableFilterValues(filterIndex);
    } else {
      this.enableFilterValues(filterIndex);
    }
  }

  checkForBothOptionSelected(filterIndex: number): void {
    const isBoth: boolean = this.filters.at(filterIndex).get('selectedSearchOption')?.value === 'both';

    if(isBoth) {
      this.filters.at(filterIndex).get('value')?.disable();
      this.filters.at(filterIndex).get('value')?.setValue(false);
      this.filters.at(filterIndex).get('values')?.disable();
      const valuesArray: FormArray = this.filters.at(filterIndex).get('values') as FormArray;
      valuesArray.clear();
    } else {
      this.filters.at(filterIndex).get('value')?.enable();
      this.filters.at(filterIndex).get('values')?.enable();
    }
  }

  disableFilterValues(filterIndex: number): void {
    const valuesArray: FormArray = this.filters.at(filterIndex).get('values') as FormArray;

    this.filters.at(filterIndex).get('value')?.disable();
    this.filters.at(filterIndex).get('additionalValue')?.disable();
    valuesArray.disable();
  }

  enableFilterValues(filterIndex: number): void {
    const valuesArray: FormArray = this.filters.at(filterIndex).get('values') as FormArray;

    this.filters.at(filterIndex).get('value')?.enable();
    this.filters.at(filterIndex).get('additionalValue')?.enable();
    valuesArray.enable();
  }

  setCheckListElementChange(value: any, filterIndex: number, dataType: string): void{
    const valuesArray: FormArray = this.filters.at(filterIndex).get('values') as FormArray;
    let isTrueFalse: boolean = this.filters.at(filterIndex).get('booleanOption')?.value;

    const arrayValueCheckBox: { name: string; value: boolean }[] = value.map((name: string) => ({
      name: name,
      value: isTrueFalse,
    }));

    valuesArray.clear();

    arrayValueCheckBox.forEach((selectedOption: { name: string; value: boolean }) => {
      valuesArray.push(this._formBuilder.control(selectedOption));
    });  
  }

  changeOptionSelect(value: boolean, filterIndex: number){
    const valuesArray: FormArray = this.filters.at(filterIndex).get('values') as FormArray;
    if(valuesArray.length > 0){
      valuesArray.clear();
      let selections: string[] = this.filters.at(filterIndex).get('value')?.value;
      const arrayValueCheckBox: { name: string; value: boolean }[] = selections.map((name: string) => ({
        name: name,
        value: value,
      }));
      arrayValueCheckBox.forEach((selectedOption: { name: string; value: boolean }) => {
        valuesArray.push(this._formBuilder.control(selectedOption));
      }); 
    }
  }
  
  checkFiltersAvailability(): void {
    const filters: FilterField[] = this.filterForm.getRawValue().filters;
    const selectedFilterIds: string[] = filters.filter(element => !element.available && element._id !== '').map(element => element._id);

    this.fields.forEach((element, i) => {
      let isAvailable: boolean = true;
      if (selectedFilterIds.includes(element._id)) {
        isAvailable = false
      } 
      this.fields[i].available = isAvailable;
    });
  }

  setToggleValue(event: any, filterIndex: number): void {

    const value: string = new Boolean(event.checked).toString();

    const valuesArray: FormArray = this.filters.at(filterIndex).get('values') as FormArray;

    if (valuesArray.length > 0) {
      valuesArray.clear()
    }
    valuesArray.push(this._formBuilder.control(value));
  }
  
}
