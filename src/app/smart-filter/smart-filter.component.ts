import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { Config, filterOptionMenu } from './models/config';

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


  get filters() {
    return this.filterForm.controls["filters"] as FormArray;
  }

  addFilter() {
    const filter = this._formBuilder.group({
      _id: [],
      displayName: [''],
      dbName: [''],
      dataType: [''],
      isCustome: [''],
      optionList: [''],
      isDefault: [''],
    });
    this.filters.push(filter);
  }

  deleteFilter(filterIndex: number) {
    this.filters.removeAt(filterIndex);
  }
  
}
