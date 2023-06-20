import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { Config, Field } from './models/config';

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
  @Output() filterEvent: EventEmitter<FormArray> = new EventEmitter<FormArray>();

  filterForm: FormGroup = this._formBuilder.group({
    filters: this._formBuilder.array([]),
  });

  range!: FormGroup;
  prueba: boolean = false;

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
      _id: [''],
      displayName: [''],
      dbName: [''],
      dataType: [''],
      isCustome: [''],
      optionList: [''],
      isDefault: [''],
      searchOptions: [''],
      booleanOption: ['', Validators.required],
      selectedSearchOption: ['', Validators.required],
      value:                ['', Validators.required],
      additionalValue:      ['', Validators.required],
      values:               this._formBuilder.array([]),
      filterSelected:       ['', Validators.required],
    });
    
    this.filters.push(filter);
  }
 
  deleteFilter(filterIndex: number): void {
    const fieldId: string = this.filters.at(filterIndex).get('_id')?.value;
    this.filters.removeAt(filterIndex);

    // enable the filter option
    this.changeEnableStatus(fieldId, true);
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

    // disable the filter option
    this.changeEnableStatus(field._id, false);
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
    if (!this.filterForm.valid){
      this.filterForm.markAllAsTouched();
    }
    this.filterEvent.emit(form);
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

  searchOptionSelectedChange(filterIndex: number): void {
    this.checkForEmptyOptionSelected(filterIndex);
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

  changeEnableStatus(fieldId: string, isAvailable: boolean): void {
    // enable the filter option
    const index: number = this.fields.findIndex(element => element._id === fieldId)
    if (index === -1) {
      return
    }
    this.fields[index].available = isAvailable;
  }
}
