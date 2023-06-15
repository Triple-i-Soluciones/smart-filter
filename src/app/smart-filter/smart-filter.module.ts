import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SmartFilterComponent } from './smart-filter.component';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


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
  ],
  exports: [
    SmartFilterComponent,
  ],
  providers: [],
  bootstrap: []
})
export class SmartFilterModule { }
