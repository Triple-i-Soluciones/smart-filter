import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Config, Field, Filter } from './models/config';
import { FilterOption } from './models/FilterOption';

@Component({
  selector: 'app-smart-filter',
  templateUrl: './smart-filter.component.html',
  styleUrls: ['./smart-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SmartFilterComponent implements OnInit, OnChanges {

  @Input() config: Config = new Config();
  @Input() initialFields: any[] = [];
  @Input() preloadFilter: boolean = false;
  @Input() doInitialFilter: boolean = false;

  @Output() filterEvent: EventEmitter<Filter[]> = new EventEmitter<Filter[]>();
  @Output() clearEvent: EventEmitter<any> = new EventEmitter<any>();

  filterForm: FormGroup = this._formBuilder.group({
    filters: this._formBuilder.array([]),
  });

  range!: FormGroup;
  filterOptions: FilterOption[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _changeDetectorRef: ChangeDetectorRef,
  ) { }

  /**
   * On Init
   */
  ngOnInit(): void {
    this.setFilterOptions(structuredClone(this.config.fields));
    this.initRangeFormGroup();

    if (this.preloadFilter) {
      this.initFilter();

      if (this.doInitialFilter) {
        this.filter();
      }
    }
  }

  /**
   * Sets the filter options to make them available
   * @param fields 
   */
  setFilterOptions(fields: Field[]): void {
    this.filterOptions = structuredClone(fields).map((field: Field) => {
      return new FilterOption(field);
    });
  }

  /**
   * Initialize the range form group
   */
  initRangeFormGroup(): void {
    this.range = new FormGroup({
      start: new FormControl([ Validators.required]),
      end: new FormControl([Validators.required]),
    });
  }

  /**
   * ngOnChanges
   * @param {SimpleChanges} changes changes to inputs event 
   */
  ngOnChanges(changes: SimpleChanges): void {
    // TODO: Check this method because it makes the ngOnInit run twice
    // if(changes?.['config']) {
    //   this.config = changes['config'].currentValue;
    //   this.ngOnInit();
    // }
      
    // this._changeDetectorRef.detectChanges();
  }

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

    // this.checkFiltersAvailability();
  }

  clearFilters(): void {
    this.filters.clear();
    this.filterForm.reset();
    this.range.reset();
    // this.checkFiltersAvailability();
    this.clearEvent.emit();
  }

  /**
   * 
   * @param field 
   * @param filterIndex 
   */
    filterSelectedChange(field: string, filterIndex: number): void {
      this.setFilterValue(field, filterIndex);
    }

    /**
   * 
   * @param fieldId 
   * @param filterIndex 
   */
    setFilterValue(fieldId: string, filterIndex: number): void {
      const filterId: string = this.filters.at(filterIndex).value._id;
      if (filterId !== '') {
        this.resetFilterValues(filterIndex);
      }
      
      const index: number = this.config.fields.findIndex(f => f._id === fieldId);
      if (index !== -1) {
        const field: Field = this.config.fields[index]
        this.filters.at(filterIndex).patchValue(field);
        
        if (field.dataType === 'boolean') {
          this.initBooleanValues(filterIndex);
        }
      }
  
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

    this.filters.at(filterIndex).get('value')?.removeValidators(Validators.required);
    this.filters.at(filterIndex).get('value')?.updateValueAndValidity();

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
    this.checkForAddingValidators(filterIndex);
  }

  /**
   * 
   * @param filterIndex 
   */
  checkForAddingValidators(filterIndex: number): void {
    this.filters.at(filterIndex).get('values')?.removeValidators(Validators.required);
    this.filters.at(filterIndex).get('value')?.removeValidators(Validators.required);
    this.filters.at(filterIndex).get('additionalValue')?.removeValidators(Validators.required);

    if (this.filters.at(filterIndex).get('selectedSearchOption')?.value !== 'empty') {
      this.filters.at(filterIndex).get('values')?.addValidators(Validators.required);
      this.filters.at(filterIndex).get('values')?.updateValueAndValidity();
      this.filters.at(filterIndex).get('value')?.addValidators(Validators.required);
      this.filters.at(filterIndex).get('value')?.updateValueAndValidity();
    }

    if (this.filters.at(filterIndex).get('selectedSearchOption')?.value === 'btwn') {
      if (this.filters.at(filterIndex).get('dataType')?.value === 'number') {
        this.filters.at(filterIndex).get('additionalValue')?.addValidators(Validators.required);
        this.filters.at(filterIndex).get('additionalValue')?.updateValueAndValidity();
      }
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
  // checkFiltersAvailability(): void {
  //   const filters: FilterField[] = this.filterForm.getRawValue().filters;
  //   const selectedFilterIds: string[] = filters.filter(element => !element.available && element._id !== '').map(element => element._id);

  //   this.fields.forEach((element, i) => {
  //     let isAvailable: boolean = true;
  //     if (selectedFilterIds.includes(element._id)) {
  //       isAvailable = false
  //     } 
  //     this.fields[i].available = isAvailable;
  //   });
  // }

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

  /**
   * Preloads the filters with the initial field values
   */
  initFilter(): void {
    this.initialFields.forEach((filter, i) => {
      this.addFilter();
      // Set selected filter option
      const filterSelected: FilterOption = new FilterOption(filter);
      this.filterSelectedChange(filterSelected._id, i);
      this.filters.at(i).get('filterSelected')?.setValue(filterSelected._id);
      // Set selected search option
      this.filters.at(i).get('selectedSearchOption')?.setValue(filter.selectedSearchOption);
      // Set input values: value and values properties
      this.filters.at(i).get('value')?.setValue(filter.value)
      this.setInputValue({target: {value: filter.values[0]}}, i);

      if(filter.dataType === 'date') {
        if (filter.selectedSearchOption === 'btwn') {
          this.range.get('start')?.setValue(filter.values[0]);

          if (filter.values[1]) {
            this.range.get('end')?.setValue(filter.values[1]);
            this.range.get('end')?.setValidators(Validators.required);
          }
        }
      }

      if (filter.dataType === 'number') {
        if (filter.selectedSearchOption === 'btwn') {
          this.filters.at(i).get('additionalValue')?.setValue(filter.values[1]);
          this.setSecondInputValue({target: {value: filter.values[1]}}, i)
        }
      }

      if (filter.selectedSearchOption === 'empty') {
        this.checkForEmptyOptionSelected(i);
      }
      
    });
  }


  
}
