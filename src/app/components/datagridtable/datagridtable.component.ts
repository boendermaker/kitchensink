import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, DragDrop, DragRef, DropListRef, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, ElementRef, EventEmitter, HostBinding, Input, Output, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { MatTableModule, MatTable, MatColumnDef, MatRowDef, MatHeaderRowDef, MatTableDataSource } from '@angular/material/table';
import { DatagridTableService } from './datagridtable.service';
import { BehaviorSubject } from 'rxjs';
import { DatagridTableActionsComponent } from './actions/actions.component';

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
  imports: [MatTableModule, CdkDropList, CdkDrag],
  templateUrl: './datagridtable.component.html',
  styleUrl: './datagridtable.component.scss',
  providers: [DatagridTableService]
})

export class DatagridTableComponent implements AfterViewInit, AfterContentInit {

  @ContentChild(DatagridTableActionsComponent, {static: true}) datagridTableActions: DatagridTableActionsComponent;

  @ContentChildren(MatHeaderRowDef) headerRowDefs: QueryList<MatHeaderRowDef>;
  @ContentChildren(MatRowDef) rowDefs: QueryList<MatRowDef<any>>;
  @ContentChildren(MatColumnDef) columnDefs: QueryList<MatColumnDef>;

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatTable, {read: ElementRef}) tableRef: ElementRef;

  @Input() dataSource: MatTableDataSource<any>;
  @Input() columns: string[];
  @Input()
  get resizeColumns(): boolean {
    return this.datagridTableService.state.resizeColumns;
  }
  set resizeColumns(value: boolean) {
    this.datagridTableService.state.resizeColumns = value;
  }

  @Input()
  get dragSortColumns(): boolean {
    return this.datagridTableService.state.dragSortColumns;
  }
  set dragSortColumns(value: boolean) {
    this.datagridTableService.state.dragSortColumns = value;
  }

  @Input()
  get dragSortRows(): boolean {
    return this.datagridTableService.state.dragSortRows;
  }
  set dragSortRows(value: boolean) {
    this.datagridTableService.state.dragSortRows = value;
  }

  constructor(
    private datagridTableService: DatagridTableService,
    private el: ElementRef,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.handleTableData();
    this.initColumnDragDrop();
  }

  ngAfterContentInit() {
    this.columnDefs.forEach(columnDef => this.table.addColumnDef(columnDef));
    this.rowDefs.forEach(rowDef => this.table.addRowDef(rowDef));
    this.headerRowDefs.forEach(headerRowDef => this.table.addHeaderRowDef(headerRowDef));
    //this.datagridTableActions.datagridTableRef$.next(this);
    this.datagridTableActions.ref = this;
  }

  //################################################

  tester(): void {
    console.log('CALLED FROM TABLEACTIONS COMPONENT IN DATAGRIDTABLE COMPONENT');
  }

  handleTableData(): void {
    this.datagridTableService.setDataSource(this.dataSource);
    this.dataSource.connect().subscribe((data) => {
      this.table.renderRows();
    });
  }

  //################################################

  initColumnDragDrop(): void {
    if(this.datagridTableService.state.dragSortColumns) {

      this.datagridTableService.setTableRef(this.tableRef);

      this.datagridTableService.createDropList('columnDropList', this.tableRef.nativeElement.querySelector('thead'));

      const updateColumns = () => { 
        this.datagridTableService.state.dropLists['columnDropList']
        .withItems(
          this.datagridTableService.getDraggables(this.tableRef.nativeElement.querySelectorAll('th'), '[headerdraghandle]')
        )
        .withOrientation('horizontal');
      }

      updateColumns();

      this.datagridTableService.state.dropLists['columnDropList'].dropped.subscribe({
        next: (event) => {
          if(event.isPointerOverContainer) {
            moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
            this.cdr.detectChanges();
            updateColumns();
            this.table.renderRows();
          }
        }
      })

    }
  }

  //################################################
  rowDropped(e): void {
    const data = this.dataSource.data;
    moveItemInArray(data, e.previousIndex, e.currentIndex);
    this.dataSource.connect().next(data);
  }

  //################################################

}
