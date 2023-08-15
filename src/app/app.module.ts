import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SmartFilterModule } from 'projects/smart-filter/src/lib/smart-filter.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    
    SmartFilterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
