import { DragDrop, DragRef, DragRefConfig, DropListOrientation, DropListRef } from '@angular/cdk/drag-drop';
import { ElementRef, Injectable, QueryList } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTab } from '@angular/material/tabs';

export interface IDatagridTableState {
  dataSource: MatTableDataSource<any>;
  dropLists: {[p:string]: DropListRef};
  draggables: {[p:string]: DragRef[]};
  tableRef: ElementRef;
  dragSortColumns: boolean;
  dragSortRows: boolean;
  resizeColumns: boolean;
}

@Injectable()
export class DatagridTableService {

  state: IDatagridTableState = {
    dataSource: null,
    dropLists: {},
    draggables: {},
    tableRef: null as unknown as ElementRef,
    dragSortColumns: false,
    dragSortRows: false,
    resizeColumns: false
  }

  constructor(private dragDrop: DragDrop) {  }

//###########################

  setDataSource(dataSource: MatTableDataSource<any>): void {
    this.state.dataSource = dataSource;
  }

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

  setTableRef(tableRef: ElementRef): void {
    this.state.tableRef = tableRef;
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
