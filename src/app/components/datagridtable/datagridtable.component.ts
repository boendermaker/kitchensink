import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, DragDrop, DragRef, DropListRef, moveItemInArray } from '@angular/cdk/drag-drop';
import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ContentChild, ContentChildren, ElementRef, EventEmitter, HostBinding, Input, Output, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { MatTableModule, MatTable, MatColumnDef, MatRowDef, MatHeaderRowDef, MatTableDataSource } from '@angular/material/table';
import { DragDropTableService } from './dragdrop.servce';
import { DatagridTableHeaderComponent } from './header/header.component';

export interface Column {
  columnDef: string;
  header: string;
  cell: Function;
  isLink?: boolean;
  url?: string;
}

@Component({
  selector: 'app-datagridtable',
  standalone: true,
  imports: [MatTableModule, CdkDropList, CdkDrag, CdkDropListGroup],
  templateUrl: './datagridtable.component.html',
  styleUrl: './datagridtable.component.scss',
  providers: [DragDropTableService]
})
export class DatagridTableComponent implements AfterViewInit, AfterContentInit {

  @ContentChildren(MatHeaderRowDef) headerRowDefs: QueryList<MatHeaderRowDef>;
  @ContentChildren(MatRowDef) rowDefs: QueryList<MatRowDef<any>>;
  @ContentChildren(MatColumnDef) columnDefs: QueryList<MatColumnDef>;

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatTable, {read: ElementRef}) tableRef: ElementRef;

  @Input() dataSource: any;
  @Input() columns: string[];

  constructor(
    private dragDropTableService: DragDropTableService,
    private el: ElementRef,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    console.log(this.dataSource)
  }

  ngAfterViewInit(): void {
    this.handleTableHeaderDraggable();
    this.handleRowsDraggable();
  }

  ngAfterContentInit() {
    this.columnDefs.forEach(columnDef => this.table.addColumnDef(columnDef));
    this.rowDefs.forEach(rowDef => this.table.addRowDef(rowDef));
    this.headerRowDefs.forEach(headerRowDef => this.table.addHeaderRowDef(headerRowDef));
  }

//################################################

  handleTableHeaderDraggable(): void {

    this.dragDropTableService.addDropList('dropzone', this.tableRef.nativeElement.querySelector('thead'));
    this.dragDropTableService.dropLists['dropzone'].lockAxis = 'x';
    this.dragDropTableService.dropLists['dropzone'].withOrientation('horizontal');

    this.tableRef.nativeElement.querySelectorAll('th').forEach((header, index) => {
      this.dragDropTableService.addDraggable('header', header, header.querySelector('[headerdraghandle]'));
    })

    this.dragDropTableService.connectDraggablesToDropList('header', 'dropzone');

    this.dragDropTableService.dropLists['dropzone'].data = this.columns;

    this.dragDropTableService.dropLists['dropzone'].dropped.subscribe((a) => {
      moveItemInArray(this.columns, a.previousIndex, a.currentIndex);
      this.cdr.detectChanges();
      this.table.renderRows();
      this.updateHeaderChanges();
      this.updateRowChanges();
    });
  }

//################################################

  handleRowsDraggable(): void {

    this.dragDropTableService.addDropList('rowdropzone', this.tableRef.nativeElement.querySelector('tbody'));
    this.dragDropTableService.dropLists['rowdropzone'].withOrientation('vertical');

    this.tableRef.nativeElement.querySelectorAll('tbody>tr').forEach((row) => {
      //this.dragDropTableService.addDraggable('row', row, row.querySelector('[rowdraghandle]'));
      this.dragDropTableService.addDraggable('row', row);
    })

    this.dragDropTableService.connectDraggablesToDropList('row', 'rowdropzone');

    this.dragDropTableService.dropLists['rowdropzone'].data = this.dataSource;

    this.dragDropTableService.dropLists['rowdropzone'].dropped.subscribe((a) => {
      const previousIndex = this.dataSource.findIndex(d => d === a.item.data);

      moveItemInArray(this.dataSource, a.previousIndex, a.currentIndex);
      this.updateRowChanges();
      this.table.renderRows();
    });
  }

//################################################

updateHeaderChanges(): void {
  delete this.dragDropTableService.draggables['header'];

  this.tableRef.nativeElement.querySelectorAll('th').forEach((header, index) => {
    this.dragDropTableService.addDraggable('header', header, header.querySelector('[headerdraghandle]'));
  })

  this.dragDropTableService.connectDraggablesToDropList('header', 'dropzone');
}

//################################################

  updateRowChanges(): void {
    delete this.dragDropTableService.draggables['row'];

    this.tableRef.nativeElement.querySelectorAll('tbody>tr').forEach((row) => {
      this.dragDropTableService.addDraggable('row', row);
    })

    this.dragDropTableService.connectDraggablesToDropList('row', 'rowdropzone');
  }

//################################################

}
