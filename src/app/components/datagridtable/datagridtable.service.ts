import { DragDrop, DragRef, DragRefConfig, DropListOrientation, DropListRef } from '@angular/cdk/drag-drop';
import { ComponentRef, ElementRef, Injectable, QueryList } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { DatagridTableComponent } from './datagridtable.component';

export interface IDatagridTableState {
  dataSource: MatTableDataSource<any>;
  columnFilter?: Function[]
  dropLists: {[p:string]: DropListRef};
  draggables: {[p:string]: DragRef[]};
  dragSortColumns: boolean;
  dragSortRows: boolean;
  resizeColumns: boolean;
  sorting: boolean;
  toggleColumns: boolean;
  tableRef: ElementRef;
  tableInstanceRef: MatTable<any>;
  tableComponentRef: DatagridTableComponent;
}

@Injectable()
export class DatagridTableService {

  state: IDatagridTableState = {
    dataSource: new MatTableDataSource<any>(),
    columnFilter: [],
    dropLists: {},
    draggables: {},
    resizeColumns: false,
    dragSortColumns: false,
    dragSortRows: false,
    sorting: false,
    toggleColumns: false,
    tableRef: null as unknown as ElementRef,
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

  setTableRef(tableRef: ElementRef): void {
    this.state.tableRef = tableRef;
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

  refresh(): void {
    this.state.tableInstanceRef.renderRows();
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

  getDraggable(name: string, el: ElementRef<HTMLElement> | HTMLElement, dragHandle?: ElementRef<HTMLElement> | HTMLElement, cfg?: DragRefConfig): void {
    if(!Array.isArray(this.state.draggables[name])) {
      this.state.draggables[name] = [];
    }

    const draggable = this.dragDrop.createDrag(el, cfg);

    if(dragHandle) {
      this.state.draggables[name].push(draggable.withHandles([dragHandle]));
    }else {
      this.state.draggables[name].push(draggable);
    }

  }

//###########################

  connectDraggablesToDropList(draggables: string, droplist: string): void {
    this.state.dropLists[droplist].withItems(this.state.draggables[draggables]);
  }

//###########################

  createDropList(name: string, el: ElementRef): void {
    this.state.dropLists[name] = this.dragDrop.createDropList(el);
  }

//###########################

  getDraggables(draggables: QueryList<HTMLElement>, dragHandleSelector?: string): DragRef[] {
    return Array.from(draggables).map((elDraggable: HTMLElement) => {
      const draggable: DragRef = this.dragDrop.createDrag(elDraggable);
      let dragHandle: HTMLElement | null = null;

      if(dragHandleSelector) {
        dragHandle = elDraggable.querySelector(dragHandleSelector);
      }

      return dragHandle ? draggable.withHandles([dragHandle]) : draggable;
    })
  }

//###########################

  resetAll(): void {
    this.resetAllDraggables();
    this.resetAllDropLists();
  }

//###########################

  resetAllDraggables(): void {
    this.state.draggables = {};
  }

//###########################

  resetAllDropLists(): void {
    this.state.dropLists = {};
  }

//###########################

}
