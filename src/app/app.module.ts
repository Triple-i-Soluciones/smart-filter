import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SmartFilterModule } from 'smart-filter';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SmartFilterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
