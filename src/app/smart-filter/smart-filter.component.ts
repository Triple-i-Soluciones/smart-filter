import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
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
  prueba: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
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
      selectedSearchOption: ['', Validators.required],
      value: ['', Validators.required],
      additionalValue: ['', Validators.required],
      values: this._formBuilder.array([]),
      filterSelected: ['', Validators.required],
    });
    
    this.filters.push(filter);
  }
 
  deleteFilter(filterIndex: number): void {
    this.filters.removeAt(filterIndex);
  }

  filterSelectedChange(field: Field, filterIndex: number): void {
    this.setFilterValue(field, filterIndex);
  }

  setFilterValue(field: Field, filterIndex: number): void {

    const filterId: string = this.filters.at(filterIndex).value._id;
    if (filterId !== '') {
      this.resetValues(filterIndex);
    }
    
    this.filters.at(filterIndex).patchValue(field);
  }

  resetValues(filterIndex: number): void {
    this.filters.at(filterIndex).get('value')?.setValue('');

    const valuesArray: FormArray = this.filters.at(filterIndex).get('values') as FormArray;
    this.resetFormArrays(valuesArray);
  }

  resetFormArrays(formArray: FormArray) {
    formArray.clear();
    formArray.controls.forEach((control) => {
      if (control instanceof FormArray) {
        this.resetFormArrays(control);
      }
    });
  }

  setDates(filterIndex: number, date: string): void {
    console.log(this.range.value)
  }

  filter(): void {
    const form = this.filterForm.getRawValue();
    if (!this.filterForm.valid){
      this.filterForm.markAllAsTouched();
    }
        console.log("form filters", form.filters) 
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

    const valuesArray: FormArray = this.filters.at(filterIndex).get('values') as FormArray;

    if (valuesArray.length > 0 && filterOption !== "entre") valuesArray.clear();
    
    if ((valuesArray.length > 0 && dateRange==="start")) valuesArray.clear();

    if (value !== null) valuesArray.push(this._formBuilder.control(value));
  }

  setDropdownElementChange(value: any, filterIndex: number, dataType: string): void{
    const valuesArray: FormArray = this.filters.at(filterIndex).get('values') as FormArray;
    if (valuesArray.length > 0) {
      valuesArray.clear();
    }
    value.forEach((selectedOption:string)=>{
      valuesArray.push(this._formBuilder.control(selectedOption));
    })   
  }

}
