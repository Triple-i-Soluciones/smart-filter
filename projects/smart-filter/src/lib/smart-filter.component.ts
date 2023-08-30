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

  /**
   * On Init
   */
  ngOnInit(): void {
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

  /**
   * Filters getter
   */
  get filters(): FormArray {
    return this.filterForm.controls["filters"] as FormArray;
  }

  /**
   * Adds a filter to the filter list
   */
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
      value:                [''],
      additionalValue:      [''],
      values:               this._formBuilder.array([]),
      filterSelected:       ['', Validators.required],
    });
    
    this.filters.push(filter);
  }
 
  /**
   * Deletes a filter from the filter list
   * @param filterIndex 
   */
  deleteFilter(filterIndex: number): void {
    this.filters.removeAt(filterIndex);

    this.checkFiltersAvailability();
  }

  /**
   * 
   * @param field 
   * @param filterIndex 
   */
  filterSelectedChange(field: Field, filterIndex: number): void {
    this.setFilterValue(field, filterIndex);
  }

  /**
   * 
   * @param field 
   * @param filterIndex 
   */
  setFilterValue(field: Field, filterIndex: number): void {
    const filterId: string = this.filters.at(filterIndex).value._id;
    if (filterId !== '') {
      this.resetFilterValues(filterIndex);
    }
    
    this.filters.at(filterIndex).patchValue(field);

    if (field.dataType === 'boolean') {
      this.initBooleanValues(filterIndex);
    }

    this.checkFiltersAvailability();
  }

  /**
   * 
   * @param filterIndex 
   */
  initBooleanValues(filterIndex: number): void {
    const valuesArray: FormArray = this.filters.at(filterIndex).get('values') as FormArray;
    valuesArray.push(this._formBuilder.control('true'));
    this.filters.at(filterIndex).get('value')?.setValue(true);
  }

  /**
   * 
   * @param filterIndex 
   */
  resetFilterValues(filterIndex: number): void {
    this.filters.at(filterIndex).get('value')?.setValue('');
    this.filters.at(filterIndex).get('additionalValue')?.setValue('');

    const valuesArray: FormArray = this.filters.at(filterIndex).get('values') as FormArray;
    this.resetFormArrays(valuesArray);
  }

  /**
   * 
   * @param formArray 
   */
  resetFormArrays(formArray: FormArray): void {
    formArray.clear();
    formArray.controls.forEach((control) => {
      if (control instanceof FormArray) {
        this.resetFormArrays(control);
      }
    });
  }

  /**
   * 
   * @returns 
   */
  filter(): void {
    const form = this.filterForm.getRawValue();
    if (!this.filterForm.valid){
      this.filterForm.markAllAsTouched();
      return;
    }

    const filters: Filter[] = this.buildFilters(form.filters);

    this.filterEvent.emit(filters);
  }

  /**
   * 
   * @param formFilters 
   * @returns 
   */
  buildFilters(formFilters: any[]): Filter[] {
    return formFilters.map(formFilter => {
      return new Filter({
        dbName:               formFilter.dbName,
        dataType:             formFilter.dataType,
        isCustome:            formFilter.isCustome,
        parentField:          formFilter.parentField,
        isDefault:            formFilter.isDefault,
        selectedSearchOption: formFilter.selectedSearchOption,
        values:               formFilter.values,
        additionalValue:      formFilter.additionalValue,
      })
    })
  }

  /**
   * 
   * @param event 
   * @param filterIndex 
   */
  setInputValue(event: any, filterIndex: number): void {
    const inputValue: string = event.target.value;

    const valuesArray: FormArray = this.filters.at(filterIndex).get('values') as FormArray;
    valuesArray.clear();
    valuesArray.push(this._formBuilder.control(inputValue));
  }

  /**
   * 
   * @param event 
   * @param filterIndex 
   */
  setSecondInputValue(event: any, filterIndex: number): void {
    const value: string = event.target.value;

    const valuesArray: FormArray = this.filters.at(filterIndex).get('values') as FormArray;
    if (valuesArray.length > 1) {
      valuesArray.removeAt(1);
    }
    valuesArray.push(this._formBuilder.control(value));
  }

  /**
   * 
   * @param event 
   * @param filterIndex 
   * @param dateRange 
   */
  setDateValue(event: any, filterIndex: number, dateRange?: string): void{
    const value: string = event.target.value;

    //restart form validators if date range is selected more than once
    if(this.range.get('end')?.value == null){
      this.range.get('end')?.setValue(FormGroup, Validators.required)      
    } 
    
    const filterOption: string = this.filters.at(filterIndex).get('selectedSearchOption')?.value;
    const valuesArray: FormArray = this.filters.at(filterIndex).get('values') as FormArray;

    if (valuesArray.length > 0 && filterOption !== "btwn") valuesArray.clear();
    
    if ((valuesArray.length > 0 && dateRange==="start")) valuesArray.clear();

    if (value !== null) valuesArray.push(this._formBuilder.control(value));
  }

  /**
   * 
   * @param value 
   * @param filterIndex 
   */
  setDropdownElementChange(value: any, filterIndex: number): void{
    const valuesArray: FormArray = this.filters.at(filterIndex).get('values') as FormArray;
    valuesArray.clear();

    value.forEach((selectedOption:string)=>{
      valuesArray.push(this._formBuilder.control(selectedOption));
    })   
  }

  /**
   * 
   * @param values 
   * @param filterIndex 
   */
  setMultiDropdownElementChange(values: string[], filterIndex: number): void{
    let valuesArray: FormArray = this.filters.at(filterIndex).get('values') as FormArray;
    valuesArray.clear();

    for (let val of values) {
      valuesArray.push(this._formBuilder.control(val));
    }   
  }

  /**
   * 
   * @param filterIndex 
   */
  searchOptionSelectedChange(filterIndex: number): void {
    this.enableFilterValues(filterIndex)
    this.checkForEmptyOptionSelected(filterIndex);
    this.checkForBothOptionSelected(filterIndex);
  }

  /**
   * 
   * @param filterIndex 
   */
  betweenOptionValidation(filterIndex: number): void{
    if (this.filters.at(filterIndex).get('selectedSearchOption')?.value === 'btwn' && this.filters.at(filterIndex).get('dataType')?.value !== 'date'){
      this.filters.at(filterIndex).get('additionalValue')?.setValidators([Validators.required]);
    }
  }

  /**
   * 
   * @param filterIndex 
   */
  checkForEmptyOptionSelected(filterIndex: number): void {
    const isEmptyOptionSelected: boolean = this.filters.at(filterIndex).get('selectedSearchOption')?.value === 'empty';
    if(isEmptyOptionSelected) {
      this.resetFilterValues(filterIndex);
      this.disableFilterValues(filterIndex);
    }
  }

  /**
   * 
   * @param filterIndex 
   */
  checkForBothOptionSelected(filterIndex: number): void {
    const isBothOptionSelected: boolean = this.filters.at(filterIndex).get('selectedSearchOption')?.value === 'both';
    if(isBothOptionSelected) {
      this.resetFilterValues(filterIndex);
      this.disableFilterValues(filterIndex);
    }
  }

  /**
   * 
   * @param filterIndex 
   */
  disableFilterValues(filterIndex: number): void {
    const valuesArray: FormArray = this.filters.at(filterIndex).get('values') as FormArray;

    this.filters.at(filterIndex).get('value')?.disable();
    this.filters.at(filterIndex).get('additionalValue')?.disable();
    valuesArray.disable();
  }

  /**
   * 
   * @param filterIndex 
   */
  enableFilterValues(filterIndex: number): void {
    const valuesArray: FormArray = this.filters.at(filterIndex).get('values') as FormArray;

    this.filters.at(filterIndex).get('value')?.enable();
    this.filters.at(filterIndex).get('additionalValue')?.enable();
    valuesArray.enable();
  }

  /**
   * 
   * @param value 
   * @param filterIndex 
   * @param dataType 
   */
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

  /**
   * 
   * @param value 
   * @param filterIndex 
   */
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
  
  /**
   * 
   */
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

  /**
   * 
   * @param event 
   * @param filterIndex 
   */
  setToggleValue(event: any, filterIndex: number): void {

    const value: string = new Boolean(event.checked).toString();

    const valuesArray: FormArray = this.filters.at(filterIndex).get('values') as FormArray;

    if (valuesArray.length > 0) {
      valuesArray.clear()
    }
    valuesArray.push(this._formBuilder.control(value));
  }
  
}
