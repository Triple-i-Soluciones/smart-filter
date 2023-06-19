import { Component } from '@angular/core';
import { Config } from './smart-filter/models/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'smart-filter';

  operators = [
    {key: 'eq', name: 'igual a'},
    {key: 'neq', name: 'diferente de'},
    {key: 'in', name: 'contenga'},
    {key: 'notin', name: 'no contenga'},
    {key: 'gr', name: 'mayor que'},
    {key: 'le', name: 'menor que'},
    {key: 'geq', name: 'mayor o igual que'},
    {key: 'leq', name: 'menor o igual que'},
    {key: 'empty', name: 'vacío'},
    {key: 'btwn', name: 'entre'},
  ]
   

  config: Config = {
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
        searchOptions: [
          {key: 'eq', name:'igual a'}, 
          {key:'neq', name:'diferente de'}, 
          {key: 'in', name: 'contenga'}, 
          {key: 'notin', name:'no contenga'}, 
          {key: 'empty', name:'esté vacío'}],
        selectedSearchOption: '',
      },
      {
        _id: '2',
        displayName: 'fecha de término',
        dbName: 'due_date',
        dataType: 'date',
        isCustome: false,
        optionList: [],
        isDefault: false,
        searchOptions: this.operators,
        selectedSearchOption: '',
      },
      {
        _id: '4',
        displayName: 'Lista canasta de frutas',
        dbName: 'lista_canasta_frutas',
        dataType: 'dropdown',
        isCustome: true,
        optionList: [
          {_id: '1000', displayName:'Uva'}, 
          {_id: '0100', displayName: 'Fresa'}, 
          {_id: '0010', displayName: 'Limón'}, 
          {_id: '0001', displayName: 'Naranja'}],
        isDefault: false,
        searchOptions: [
          {key: 'eq', name:'igual a'}, 
          {key:'neq', name:'diferente de'}, 
          {key:'in', name:'contenga'}, 
          {key:'notin', name:'no contenga'}, 
          {key: 'empty', name:'esté vacío'}
        ],
        selectedSearchOption: '',
      },
      {
        _id: '5',
        displayName: 'Ingenieros asignados',
        dbName: 'assigned_engineers',
        dataType: 'multi-dropdown',
        isCustome: false,
        optionList: [{_id: 'aaaaa', displayName: 'Noé Reyes'}, {_id: 'bbbbb', displayName: 'Alexis Rodríguez'}, {_id: 'ccccc', displayName: 'Sergio Alonso'}],
        isDefault: false,
        searchOptions: [
          {key: 'eq', name:'igual a'}, 
          {key: 'neq', name:'diferente de'}, 
          {key: 'in', name:'contenga'},
          {key: 'notin', name:'no contenga'},
          {key: 'empty', name:'esté vacío'}
        ],
        selectedSearchOption: '',
      },
      {
        _id: '6',
        displayName: 'Prioridad',
        dbName: 'priority',
        dataType: 'composite-dropdown',
        isCustome: false,
        optionList: [{_id: '0', displayName: 'No urgente'}, {_id: '1', displayName: 'Urgente'}, {_id: '2', displayName: 'Crítica'}],
        isDefault: false,
        searchOptions: [
          {key:'eq', name:'igual a'}, 
          {key: 'neq', name:'diferente de'}, 
          {key: 'btwn', name:'entre'}, 
          {key: 'empty', name: 'esté vacío'}],
        selectedSearchOption: '',
      },
      {
        _id: '7',
        displayName: 'cantidad',
        dbName: 'amount',
        dataType: 'number',
        isCustome: false,
        optionList: [],
        isDefault: false,
        searchOptions: [ 
          {key: 'eq', name: 'igual a'},
          {key: 'neq', name: 'diferente de'},
          {key: 'gr', name: 'mayor que'},
          {key: 'le', name: 'menor que'},
          {key: 'geq', name: 'mayor o igual que'},
          {key: 'leq', name: 'menor o igual que'},
          {key: 'empty', name: 'vacío'},
          {key: 'btwn', name: 'entre'}],
        selectedSearchOption: '',
      },
    ]
  }

}


