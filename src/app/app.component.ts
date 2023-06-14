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
    queryOptions: [
      {
        type: 'text',
        options: ['contenga', 'no contenga', 'esté vacío'],
      },
      {
        // TODO: type: 'date' || 'number', evaluar si se usa así más adelante
        type: 'date',
        options: ['mayor que', 'menor que', 'entre', 'mayor o igual que', 'menor o igual que', 'vacío', 'igual a', 'diferente de'],
      },
      {
        type: 'number',
        options: ['mayor que', 'menor que', 'entre', 'mayor o igual que', 'menor o igual que', 'vacío', 'igual a', 'diferente de'],
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


