import { DragDrop, DragRef, DragRefConfig, DropListOrientation, DropListRef, moveItemInArray } from '@angular/cdk/drag-drop';
import { ComponentRef, DestroyRef, effect, ElementRef, inject, Injectable, QueryList, signal, WritableSignal } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { DatagridTableComponent } from './datagridtable.component';
import { firstValueFrom, Observable, Subject } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { IDatagridTableMessageOverlay, IDatagridTableMessageOverlayMessageItem, TDatagridTableMessageTypes } from './interfaces/overlaymessage.interface';
import { IDatagridTableState } from './interfaces/state.interface';
import { SelectionModel } from '@angular/cdk/collections';
import { EDatagridTableStateChangeEvents } from './interfaces/statechangetypes.enum';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Injectable()
export class DatagridTableService {

  destroyRef: DestroyRef = inject(DestroyRef);

  private stateChange$: Subject<EDatagridTableStateChangeEvents> = new Subject();
  stateChange_: Observable<EDatagridTableStateChangeEvents> = this.stateChange$.asObservable();

  state: IDatagridTableState = {
    dataSource: new MatTableDataSource(),
    paginator: null as unknown as MatPaginator,
    rowSelection: new SelectionModel(true, []),
    $totalRows: signal(0),
    $pageSize: signal(10),
    $pageIndex: signal(0),
    $isLoading: signal(false),
    $messages: signal({showMessages: false, messages: []}),
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
    this.handleStateChange();
  }

//###########################

   handleStateChange(): void {
    this.stateChange_.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (event: EDatagridTableStateChangeEvents) => {
        console.log('EVENT: ', event);
        const stateEvents = {
          [EDatagridTableStateChangeEvents.CHANGE_DATA]: () => {
            this.state.dataSource._updateChangeSubscription();
          },
          
          [EDatagridTableStateChangeEvents.CHANGE_COLUMN_ORDER]: () => {
            this.state.tableInstanceRef.renderRows();
          },        
        }

        if (stateEvents[event]) {
          stateEvents[event].bind(this)();
        }
      }
    })
  }

//###########################

  clearMessages(): void {
    this.state.$messages.set({showMessages: false, messages: []});
  }

//###########################

  addMessage(type: TDatagridTableMessageTypes, content: string): void {
    this.state.$messages.update((state) => {
      const messages = state.messages as IDatagridTableMessageOverlayMessageItem[];
      messages.push({type, content});
      return {showMessages: true, messages};
    });
  }

//###########################

  setShowMessageOverlay(showMessage: boolean): void {
    this.state.$messages.update((state) => {
      state.showMessages = showMessage
      return state;
    });
  }

//###########################

  setLoading(isLoading: boolean): void {
    this.state.$isLoading.set(isLoading);
  }

//###########################

  setData(data: Array<unknown>): void {
    this.state.dataSource.data = data;
  }

//###########################

  setTotalRows(length: number): void {
    this.state.$totalRows.set(length);
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
    this.state.paginator.pageSize = pageSize;
  }

//###########################

  setPageIndex(pageIndex: number): void {
    this.state.$pageIndex.set(pageIndex);
    this.state.paginator.pageIndex = pageIndex;
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

  setColumns(columns: string[]): void {
    this.state.columns = columns;
  }

//###########################

  setDisplayedColumns(displayedColumns: string[]): void {
    this.state.displayedColumns = displayedColumns;
  }

//###########################

  setDragSortRows(dragSortRows: boolean): void {
    this.state.dragSortRows = dragSortRows;
  }

//###########################

  getColumnIndex(columnName: string): number {
    return this.state.displayedColumns.indexOf(columnName);
  }

//###########################

  orderColumn(columnName: string, direction: 'left' | 'right'): void {
    const columnIndex = this.getColumnIndex(columnName);
    moveItemInArray(this.state.displayedColumns, columnIndex, direction === 'left' ? columnIndex - 1 : columnIndex + 1);
    this.triggerStateChange(EDatagridTableStateChangeEvents.CHANGE_COLUMN_ORDER);
  }

//###########################

  refresh(): void {
    this.state.tableInstanceRef.renderRows();
  }

//###########################

  triggerStateChange(stateChangeEvent: EDatagridTableStateChangeEvents): void {
    this.stateChange$.next(EDatagridTableStateChangeEvents[stateChangeEvent]);
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
