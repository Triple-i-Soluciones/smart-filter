import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SmartFilterComponent } from './smart-filter.component';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';


@NgModule({
  declarations: [
    SmartFilterComponent
  ],
  imports: [
    BrowserModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [
    SmartFilterComponent,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es' }],
  bootstrap: []
})
export class SmartFilterModule { }
