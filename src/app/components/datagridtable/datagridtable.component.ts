import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, DragDrop, DragRef, DropListRef, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, ElementRef, EventEmitter, HostBinding, Input, Output, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { MatTableModule, MatTable, MatColumnDef, MatRowDef, MatHeaderRowDef, MatTableDataSource } from '@angular/material/table';
import { TableDragDropService } from './tabledragdrop.service';
import { BehaviorSubject } from 'rxjs';

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
  imports: [MatTableModule, CdkDropListGroup],
  templateUrl: './datagridtable.component.html',
  styleUrl: './datagridtable.component.scss',
  providers: [TableDragDropService],
  changeDetection: ChangeDetectionStrategy.Default,
})

export class DatagridTableComponent implements AfterViewInit, AfterContentInit {

  @ContentChildren(MatHeaderRowDef) headerRowDefs: QueryList<MatHeaderRowDef>;
  @ContentChildren(MatRowDef) rowDefs: QueryList<MatRowDef<any>>;
  @ContentChildren(MatColumnDef) columnDefs: QueryList<MatColumnDef>;

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatTable, {read: ElementRef}) tableRef: ElementRef;

  @Input() tableData: BehaviorSubject<any[]> = new BehaviorSubject([]);
  @Input() columns: string[];
  @Input()
  get resizeColumns(): boolean {
    return this.tableDragDropService.resizeColumns;
  }
  set resizeColumns(value: boolean) {
    this.tableDragDropService.resizeColumns = value;
  }

  @Input()
  get dragSortColumns(): boolean {
    return this.tableDragDropService.dragSortColumns;
  }
  set dragSortColumns(value: boolean) {
    this.tableDragDropService.dragSortColumns = value;
  }

  @Input()
  get dragSortRows(): boolean {
    return this.tableDragDropService.dragSortRows;
  }
  set dragSortRows(value: boolean) {
    this.tableDragDropService.dragSortRows = value;
  }

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  constructor(
    private tableDragDropService: TableDragDropService,
    private el: ElementRef,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.handleTableData();
    this.initDragDrop();
  }

  ngAfterContentInit() {
    this.columnDefs.forEach(columnDef => this.table.addColumnDef(columnDef));
    this.rowDefs.forEach(rowDef => this.table.addRowDef(rowDef));
    this.headerRowDefs.forEach(headerRowDef => this.table.addHeaderRowDef(headerRowDef));
  }

  //################################################

  handleTableData(): void {
    this.tableData.subscribe((data) => {
      this.dataSource.data = data;
      this.table.renderRows();
    });
  }

  //################################################

  initDragDrop(): void {
    this.tableDragDropService.setTableRef(this.tableRef);

    if(this.dragSortColumns) {
      this.tableDragDropService.handleDragDrop('dropzone', 'thead', 'header', 'th', 'horizontal', '[headerdraghandle]');
      this.handleColumnDropped();
    }
    if(this.dragSortRows) {
      this.tableDragDropService.handleDragDrop('rowdropzone', 'tbody', 'row', 'tbody>tr', 'vertical');
      this.handleRowDropped();
    }

  }

  //################################################

  handleRowDropped(): void {
    this.tableDragDropService.dropLists['rowdropzone'].dropped
    .subscribe((a) => {
      if(a.isPointerOverContainer) {
        moveItemInArray(this.dataSource.data, a.previousIndex, a.currentIndex);
        this.cdr.detectChanges();
        this.table.renderRows();
      }
    });
  }

  //################################################

  handleColumnDropped(): void {
    this.tableDragDropService.dropLists['dropzone'].dropped
    .subscribe((a) => {
      if(a.isPointerOverContainer) {
        moveItemInArray(this.columns, a.previousIndex, a.currentIndex);
        this.cdr.detectChanges();
        this.tableDragDropService.updateChanges('dropzone', 'header', 'th', '[headerdraghandle]');
        this.tableDragDropService.updateChanges('rowdropzone', 'row', 'tbody>tr');
        this.table.renderRows();
      }
    });
  }

  //################################################

  //################################################



  //################################################

}
