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
        displayName: 'nombre del proyecto',
        dbName: 'name',
        dataType: 'text',
        isCustome: false,
        optionList: [],
        isDefault: false,
        queryOptions: ['igual a', 'contenga', 'no contenga', 'esté vacío'],
      },
      {
        _id: '2',
        displayName: 'fecha de término',
        dbName: 'due_date',
        dataType: 'date',
        isCustome: false,
        optionList: [],
        isDefault: false,
        queryOptions: ['mayor que', 'menor que', 'entre', 'mayor o igual que', 'menor o igual que', 'vacío', 'igual a', 'diferente de']
      },
      {
        _id: '3',
        displayName: 'prefix',
        dbName: 'prefix',
        dataType: 'text',
        isCustome: false,
        optionList: [],
        isDefault: false,
        queryOptions: ['igual a', 'contenga', 'no contenga', 'esté vacío'],
      },
      {
        _id: '4',
        displayName: 'La lista',
        dbName: 'La lista',
        dataType: 'dropdown',
        isCustome: true,
        optionList: ['element 1', 'elemento 2', 'elemento 3'],
        isDefault: false,
        queryOptions: ['contenga', 'no contenga', 'esté vacío'],
      },
      {
        _id: '5',
        displayName: 'Ingenieros asignados',
        dbName: 'assigned_engineers',
        dataType: 'multi-dropdown',
        isCustome: false,
        optionList: [{_id: 'aaaaa', displayName: 'Noé Reyes'}, {_id: 'bbbbb', displayName: 'Alexis Rodríguez'}, {_id: 'ccccc', displayName: 'Sergio Alonso'}],
        isDefault: false,
        queryOptions: ['igual a', 'contenga', 'no contenga', 'esté vacío'],
      },
    ]
  }

}


