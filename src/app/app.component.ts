import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'smart-filter';

  config = {
    fields: [
      {
        displayName: 'nombre',
        dbName: 'name',
        dataType: 'text',
        isCustome: false,
        optionList: [],
        isDefault: false,
      },
      {
        displayName: 'fecha de término',
        dbName: 'due_date',
        dataType: 'date',
        isCustome: false,
        optionList: [],
        isDefault: false,
      }
    ]
  }

}


