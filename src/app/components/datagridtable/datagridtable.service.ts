import { DragDrop, DragRef, DragRefConfig, DropListOrientation, DropListRef, moveItemInArray } from '@angular/cdk/drag-drop';
import { ComponentRef, effect, ElementRef, Injectable, QueryList, signal, WritableSignal } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { DatagridTableComponent } from './datagridtable.component';
import { firstValueFrom, Observable, Subject } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


export interface IDatagridTableState {
  dataSource: MatTableDataSource<unknown>;
  paginator: MatPaginator;
  $dataLength?: WritableSignal<number>;
  $pageSize?: WritableSignal<number>;
  $pageIndex?: WritableSignal<number>;
  $isLoading?: WritableSignal<boolean>;
  $error?: WritableSignal<{hasError: boolean; msg: string}>;
  sort: MatSort;
  columns: string[];
  displayedColumns: string[];
  columnFilter?: Function[]
  dragSortRows: boolean;
  tableElementRef: ElementRef;
  tableInstanceRef: MatTable<unknown>;
  tableComponentRef: DatagridTableComponent;
}

@Injectable()
export class DatagridTableService {

  private stateChange$: Subject<void> = new Subject();
  stateChange_: Observable<void> = this.stateChange$.asObservable();

  state: IDatagridTableState = {
    dataSource: new MatTableDataSource<any>(),
    paginator: null as unknown as MatPaginator,
    $dataLength: signal(0),
    $pageSize: signal(10),
    $pageIndex: signal(0),
    $isLoading: signal(false),
    $error: signal({hasError: false, msg: ''}),
    sort: null as unknown as MatSort,
    columnFilter: [],
    columns: [],
    displayedColumns: [],
    dragSortRows: false,
    tableElementRef: null as unknown as ElementRef,
    tableInstanceRef: null as unknown as MatTable<unknown>,
    tableComponentRef: null as unknown as DatagridTableComponent
  }

  constructor(
    private dragDrop: DragDrop
  ) {

   }

//###########################

  setLoading(isLoading: boolean): void {
  this.state.$isLoading.set(isLoading);
  }

//###########################

  setError(errorMsg: string): void {

  }

//###########################

  setData(data: Array<unknown>): void {
    this.state.dataSource.data = data;
  }

//###########################

  setDataLength(length: number): void {
    this.state.$dataLength.set(length);
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

  setSort(sort: MatSort): void {
    this.state.sort = sort;
    this.state.dataSource.sort = this.state.sort;
  }

//###########################

  setPaginator(paginator: MatPaginator): void {
    this.state.paginator = paginator;
  }

//###########################

  setPageSize(pageSize: number): void {
    this.state.$pageSize.set(pageSize);
  }

//###########################

  setPageIndex(pageIndex: number): void {
    this.state.$pageIndex.set(pageIndex);
  }

//###########################

  connectPaginatorToDataSource(): void {
    this.state.dataSource.paginator = this.state.paginator;
  }

//###########################

  disconnectPaginatorFromDataSource(): void {
    this.state.dataSource.paginator = null as unknown as MatPaginator;
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
