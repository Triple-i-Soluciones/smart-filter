import { Component } from '@angular/core';
import { Config } from './smart-filter/models/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'smart-filter';

  

  config: Config = {
    filterOptionsMenu: [
      {
        _id: '1',
        displayName: 'nombre',
      },
      {
        _id: '2',
        displayName: 'fecha de término',
      }
    ],
    fields: [
      {
        _id: '1',
        displayName: 'nombre',
        dbName: 'name',
        dataType: 'text',
        isCustome: false,
        optionList: [],
        isDefault: false,
      },
      {
        _id: '2',
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


