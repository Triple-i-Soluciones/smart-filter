import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-smart-filter',
  templateUrl: './smart-filter.component.html',
  styleUrls: ['./smart-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmartFilterComponent {
  @Input() config = {};

  filterForm: FormGroup = this._formBuilder.group({
    config: "Aquí van las configs",
    filters: this._formBuilder.array([]),
  });



  constructor(
    private _formBuilder: FormBuilder,
  ) {}

  ngOnInit() {

  }

  get filters() {
    return this.filterForm.controls["filters"] as FormArray;
  }

  addFilter() {
    const lessonForm = this._formBuilder.group({
      displayName: [''],
      dbName: [''],
      dataType: [''],
      isCustome: [''],
      optionList: [''],
      isDefault: [''],
    });
    this.filters.push(lessonForm);
  }

  deleteFilter(filterIndex: number) {
    this.filters.removeAt(filterIndex);
  }

}
