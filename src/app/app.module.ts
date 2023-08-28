import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SmartFilterModule } from 'projects/smart-filter/src/lib/smart-filter.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    SmartFilterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
