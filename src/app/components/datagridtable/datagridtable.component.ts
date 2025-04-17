import { CdkDrag, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ContentChild, ContentChildren, ElementRef, Input, QueryList, ViewChild } from '@angular/core';
import { MatTableModule, MatTable, MatColumnDef, MatRowDef, MatHeaderRowDef, MatTableDataSource } from '@angular/material/table';
import { DatagridTableService } from './datagridtable.service';
import { DatagridTableActionsComponent } from './actions/actions.component';
import * as _ from 'lodash';
import { Observable, Subject } from 'rxjs';


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

  @ViewChild(MatTable, {static: true}) table: MatTable<unknown>;
  @ViewChild(MatTable, {read: ElementRef}) tableElementRef: ElementRef;

  @Input() dataSource: MatTableDataSource<unknown>;
  @Input() renderRows: Observable<void>;
  @Input() columns: string[];
  @Input() resizeColumns: boolean = false;
  @Input() dragSortColumns: boolean = false;
  @Input() dragSortRows: boolean = false;
  @Input() sortColumns: boolean = false;
  @Input() toggleColumns: boolean = false;

  constructor(
    public datagridTableService: DatagridTableService,
    private el: ElementRef,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.setTableOptions();
    this.handleRenderRows();
    this.setTableData();
  }

  ngAfterViewInit(): void {
    this.setTableRefs();
    this.initColumnDragDrop();
  }

  ngAfterContentInit() {
    this.columnDefs.forEach(columnDef => this.table.addColumnDef(columnDef));
    this.rowDefs.forEach(rowDef => this.table.addRowDef(rowDef));
    this.headerRowDefs.forEach(headerRowDef => this.table.addHeaderRowDef(headerRowDef));
  }

  //################################################

  setTableData(): void {
    this.datagridTableService.setDataSource(this.dataSource);
  }

  //################################################

  setTableOptions(): void {
    this.datagridTableService.state.columns = this.columns;
    this.datagridTableService.state.resizeColumns = this.resizeColumns;
    this.datagridTableService.state.dragSortColumns = this.dragSortColumns;
    this.datagridTableService.state.dragSortRows = this.dragSortRows;
    this.datagridTableService.state.sorting = this.sortColumns;
    this.datagridTableService.state.resizeColumns = this.resizeColumns;
  }

  //################################################

  setTableRefs(): void {
    this.datagridTableService.setTableInstanceRef(this.table);
    this.datagridTableService.setTableElementRef(this.tableElementRef);
    this.datagridTableService.setTableComponentRef(this);
  }

  //################################################

  handleRenderRows(): void {
    if(this.renderRows) {
      this.renderRows.subscribe({
        next: () => {
          this.datagridTableService.refresh();
        }
      })
    }
  }

  //################################################

  initColumnDragDrop(): void {
    if(this.datagridTableService.state.dragSortColumns) {
      this.datagridTableService.createDropList('columnDropList', this.tableElementRef.nativeElement.querySelector('thead'));

      const updateColumns = () => {
        this.datagridTableService.state.dropLists['columnDropList']
        .withItems(
          this.datagridTableService.getDraggables(this.tableElementRef.nativeElement.querySelectorAll('th'), '[headerdraghandle]')
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
            this.datagridTableService.refresh();
          }
        }
      })

    }
  }

  //################################################

  rowDropped(e): void {
    const data = this.datagridTableService.state.dataSource.data;
    moveItemInArray(data, e.previousIndex, e.currentIndex);
    this.dataSource.connect().next(data);
  }

  //################################################

}
