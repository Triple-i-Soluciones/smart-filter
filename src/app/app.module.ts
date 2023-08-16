import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SmartFilterModule } from 'projects/smart-filter/src/lib/smart-filter.module';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatExpansionModule,
    MatSelectModule,
    MatTooltipModule,
    MatIconModule,
    DragDropModule,
    SmartFilterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
