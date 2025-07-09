import { ElementRef, WritableSignal } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator.d-BpWCCOIR";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { IDatagridTableMessageOverlay } from "./overlaymessage.interface";
import { MatSort } from "@angular/material/sort.d-CHu7FXsP";
import { DatagridTableComponent } from "../datagridtable.component";
import { SelectionModel } from "@angular/cdk/collections";


export interface IDatagridTableState {
  backend: boolean;
  dataSource: MatTableDataSource<unknown>;
  paginator: MatPaginator;
  rowSelection: SelectionModel<unknown>;
  $selectedRows?: WritableSignal<unknown[]>;
  $totalRows?: WritableSignal<number>;
  $pageSize?: WritableSignal<number>;
  $pageIndex?: WritableSignal<number>;
  $isLoading?: WritableSignal<boolean>;
  $messages?: WritableSignal<IDatagridTableMessageOverlay>;
  sort: MatSort;
  columns: string[];
  displayedColumns: string[];
  columnFilter?: Map<string, unknown>;
  expandedRow: any;
  dragSortRows: boolean;
  tableElementRef: ElementRef;
  tableInstanceRef: MatTable<unknown>;
  tableComponentRef: DatagridTableComponent;
}
