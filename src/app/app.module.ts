import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SmartFilterModule } from './smart-filter/smart-filter.module';

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
