import { DragDrop, DragRef, DragRefConfig, DropListOrientation, DropListRef, moveItemInArray } from '@angular/cdk/drag-drop';
import { ComponentRef, ElementRef, Injectable, QueryList } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { DatagridTableComponent } from './datagridtable.component';
import { firstValueFrom, Observable, Subject } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';


export interface IDatagridTableState {
  dataSource: MatTableDataSource<any>;
  paginator: MatPaginator;
  columns: string[];
  displayedColumns: string[];
  columnFilter?: Function[]
  dragSortRows: boolean;
  sorting: boolean;
  tableElementRef: ElementRef;
  tableInstanceRef: MatTable<any>;
  tableComponentRef: DatagridTableComponent;
}

@Injectable()
export class DatagridTableService {

  stateChange$: Subject<void> = new Subject();
  stateChange_: Observable<void> = this.stateChange$.asObservable();

  state: IDatagridTableState = {
    dataSource: new MatTableDataSource<any>(),
    paginator: null as unknown as MatPaginator,
    columnFilter: [],
    columns: [],
    displayedColumns: [],
    dragSortRows: false,
    sorting: false,
    tableElementRef: null as unknown as ElementRef,
    tableInstanceRef: null as unknown as MatTable<unknown>,
    tableComponentRef: null as unknown as DatagridTableComponent
  }

  constructor(
    private dragDrop: DragDrop
  ) {

  }

//###########################

  setTableInstanceRef(tableInstanceRef: MatTable<unknown>): void {
    this.state.tableInstanceRef = tableInstanceRef;
  }

//###########################

  setTableElementRef(tableElementRef: ElementRef): void {
    this.state.tableElementRef = tableElementRef;
  }

//###########################

  setTableComponentRef(tableComponentRef: DatagridTableComponent): void {
    this.state.tableComponentRef = tableComponentRef;
  }

//###########################

  setDataSource(dataSource: MatTableDataSource<unknown> | Array<unknown>): void {
    if(dataSource instanceof MatTableDataSource) {
      this.state.dataSource = dataSource;
    }else if (Array.isArray(dataSource)) {
      this.state.dataSource.data = dataSource;
    }
  }

//###########################

  getColumnIndex(columnName: string): number {
    return this.state.displayedColumns.indexOf(columnName);
  }

//###########################

  orderColumn(columnName: string, direction: 'left' | 'right'): void {
    const columnIndex = this.getColumnIndex(columnName);
    moveItemInArray(this.state.displayedColumns, columnIndex, direction === 'left' ? columnIndex - 1 : columnIndex + 1);
    this.triggerStateChange();
  }

//###########################

  refresh(): void {
    this.state.tableInstanceRef.renderRows();
  }

//###########################

  triggerStateChange(): void {
    this.stateChange$.next();
  }

//###########################

  resetAllColumnFilterCallback(): void {
    this.state.columnFilter = [];
  }

//###########################

  removeColumnFilterCallback(filterCallback: Function): void {
    const index = this.state.columnFilter.indexOf(filterCallback);
    if (index !== -1) {
      this.state.columnFilter.splice(index, 1);
    }
  }

  //###########################

  addColumnFilterCallback(filterCallback: Function): void {
    this.state.columnFilter.push(filterCallback);
  }

//###########################

  filterDataSource(): void {
    this.state.dataSource.filterPredicate = (dataRow: any, filter: string): boolean => {
      return this.state.columnFilter.every((filterCallback: Function) => filterCallback(dataRow));
    }
    this.state.dataSource.filter = ' ';
  };

//###########################


}
