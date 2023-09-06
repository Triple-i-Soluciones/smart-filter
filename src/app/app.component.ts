import { Component } from '@angular/core';
import { Config, Filter} from 'projects/smart-filter/src/lib/models/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'smart-filter';

  // operators = [
  //   {key: 'eq', name: 'igual a'},
  //   {key: 'neq', name: 'diferente de'},
  //   {key: 'in', name: 'contenga'},
  //   {key: 'notin', name: 'no contenga'},
  //   {key: 'gr', name: 'mayor que'},
  //   {key: 'le', name: 'menor que'},
  //   {key: 'geq', name: 'mayor o igual que'},
  //   {key: 'leq', name: 'menor o igual que'},
  //   {key: 'empty', name: 'vacío'},
  //   {key: 'btwn', name: 'entre'},
  //   {key: 'alls', name:'todas seleccionadas'}, 
  //   {key: 'nones', name:'ninguna seleccionada'}, 
  // ]

  config: Config = {
    fields: [
      {
        _id: '1',
        displayName: 'nombre del proyecto',
        dbName: 'name',
        dataType: 'text',
        isCustome: false,
        parentField: '',
        optionList: [],
        isDefault: false,
        searchOptions: [
          {key: 'eq', name:'igual a'}, 
          {key:'neq', name:'diferente de'}, 
          {key: 'in', name: 'contenga'}, 
          {key: 'notin', name:'no contenga'}, 
          {key: 'empty', name:'vacío'},
        ],
        selectedSearchOption: '',
      },
      {
        _id: '2',
        displayName: 'fecha de término',
        dbName: 'due_date',
        dataType: 'date',
        isCustome: false,
        parentField: '',
        optionList: [],
        isDefault: false,
        searchOptions: [
          {key: 'eq', name: 'igual a'},
          {key: 'neq', name: 'diferente de'},
          {key: 'in', name: 'contenga'},
          {key: 'notin', name: 'no contenga'},
          {key: 'gr', name: 'mayor que'},
          {key: 'le', name: 'menor que'},
          {key: 'geq', name: 'mayor o igual que'},
          {key: 'leq', name: 'menor o igual que'},
          {key: 'btwn', name: 'entre'},
          {key: 'empty', name: 'vacío'},
        ],
        selectedSearchOption: '',
      },
      {
        _id: '4',
        displayName: 'Lista canasta de frutas',
        dbName: 'lista_canasta_frutas',
        dataType: 'dropdown',
        isCustome: true,
        parentField: 'fields',
        optionList: ['Uva', 'Fresa', 'Limón', 'Naranja'],
        isDefault: false,
        searchOptions: [
          {key: 'eq', name:'igual a'}, 
          {key:'neq', name:'diferente de'}, 
          {key:'in', name:'contenga'}, 
          {key:'notin', name:'no contenga'}, 
          {key: 'empty', name:'vacío'},
        ],
        selectedSearchOption: '',
      },
      {
        _id: '5',
        displayName: 'Ingenieros asignados',
        dbName: 'assigned_engineers',
        dataType: 'multi-dropdown',
        isCustome: false,
        parentField: '',
        optionList: [{_id: 'aaaaa', displayName: 'Noé Reyes'}, {_id: 'bbbbb', displayName: 'Alexis Rodríguez'}, {_id: 'ccccc', displayName: 'Sergio Alonso'}],
        isDefault: false,
        searchOptions: [
          {key: 'eq', name:'igual a'}, 
          {key: 'neq', name:'diferente de'}, 
          {key: 'in', name:'contenga'},
          {key: 'notin', name:'no contenga'},
          {key: 'empty', name:'vacío'},
        ],
        selectedSearchOption: '',
      },
      {
        _id: '6',
        displayName: 'Prioridad',
        dbName: 'priority',
        dataType: 'composite-dropdown',
        isCustome: false,
        parentField: '',
        optionList: [{_id: '0', displayName: 'No urgente'}, {_id: '1', displayName: 'Urgente'}, {_id: '2', displayName: 'Crítica'}],
        isDefault: false,
        searchOptions: [
          {key: 'eq', name: 'igual a'},
          {key: 'neq', name: 'diferente de'},
          {key: 'btwn', name: 'entre'},
          {key: 'empty', name: 'vacío'},
        ],
        selectedSearchOption: '',
      },
      {
        _id: '7',
        displayName: 'cantidad',
        dbName: 'amount',
        dataType: 'number',
        isCustome: false,
        parentField: '',
        optionList: [],
        isDefault: false,
        searchOptions: [ 
          {key: 'eq', name: 'igual a'},
          {key: 'neq', name: 'diferente de'},
          {key: 'gr', name: 'mayor que'},
          {key: 'le', name: 'menor que'},
          {key: 'geq', name: 'mayor o igual que'},
          {key: 'leq', name: 'menor o igual que'},
          {key: 'btwn', name: 'entre'},
          {key: 'empty', name: 'vacío'},
        ],
        selectedSearchOption: '',
      },
      {
        _id: '8',
        displayName: 'Tipos de Videojuegos',
        dbName: 'tipos_de_videojuegos',
        dataType: 'checklist',
        isCustome: true,
        parentField: 'fields',
        optionList: ['Shooter', 'MMORPG', 'MOBA', 'Estrategia', 'BattleRoyal'],
        isDefault: false,
        searchOptions: [
          {key: 'eq', name:'igual a'}, 
          {key:'neq', name:'diferente de'}, 
          {key:'in', name:'contenga'}, 
          {key:'notin', name:'no contenga'}, 
          {key: 'empty', name:'vacío'},
        ],
        selectedSearchOption: '',
      },
      {
        _id: '9',
        displayName: 'Completada',
        dbName: 'completed',
        dataType: 'boolean',
        isCustome: false,
        parentField: '',
        optionList: [],
        isDefault: false,
        searchOptions: [
          {key: 'eq', name:'igual a'}, 
          {key:'neq', name:'diferente de'}, 
          {key:'both', name:'ambas'}, 
        ],
        selectedSearchOption: '',
      },
    ]
  }

  testDate: Date = new Date();
  initialFilterValues = [
    {
      _id:                  '1',
      displayName:          'nombre del proyecto',
      dbName:               'name',
      dataType:             'text',
      isCustome:            false,
      parentField:          '',
      optionList:           [],
      isDefault:            false,
      searchOptions:        [{key: 'eq', name:'igual a'}, 
                            {key:'neq', name:'diferente de'}, 
                            {key: 'in', name: 'contenga'}, 
                            {key: 'notin', name:'no contenga'}, 
                            {key: 'empty', name:'vacío'}],
      booleanOption:        null,
      selectedSearchOption: 'neq',
      value:                'Sergio Alonso',
      additionalValue:      '',
      values:               ['Sergio Alonso'],
      filterSelected:       [],
    },
    // {
    //   _id: '2',
    //   displayName: 'fecha de término',
    //   dbName: 'due_date',
    //   dataType: 'date',
    //   isCustome: false,
    //   parentField: '',
    //   optionList: [],
    //   isDefault: false,
    //   searchOptions: [
    //     {key: 'eq', name: 'igual a'},
    //     {key: 'neq', name: 'diferente de'},
    //     {key: 'in', name: 'contenga'},
    //     {key: 'notin', name: 'no contenga'},
    //     {key: 'gr', name: 'mayor que'},
    //     {key: 'le', name: 'menor que'},
    //     {key: 'geq', name: 'mayor o igual que'},
    //     {key: 'leq', name: 'menor o igual que'},
    //     {key: 'btwn', name: 'entre'},
    //     {key: 'empty', name: 'vacío'},
    //   ],
    //   selectedSearchOption: 'eq',
    //   value:                this.testDate,
    //   additionalValue:      '',
    //   values:               [this.testDate],
    //   filterSelected:       [],
    // }
  ]

  printFilters(filters: Filter[]): void{
    console.log('filter from parent component', filters);
  }

  erased() {
    console.log("borrado emitido")
  }

}


