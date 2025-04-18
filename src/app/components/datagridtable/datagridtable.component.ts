import { CdkDrag, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ContentChild, ContentChildren, DestroyRef, ElementRef, inject, Input, QueryList, ViewChild } from '@angular/core';
import { MatTableModule, MatTable, MatColumnDef, MatRowDef, MatHeaderRowDef, MatTableDataSource } from '@angular/material/table';
import { DatagridTableService } from './datagridtable.service';
import { DatagridTableActionsComponent } from './actions/actions.component';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AllAngularMaterialMDCModulesModule } from '../../shared/modules/allmaterial/allmaterial.module';


@Component({
  selector: 'app-datagridtable',
  standalone: true,
  imports: [AllAngularMaterialMDCModulesModule, CdkDropList, CdkDrag],
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
  @Input() stateChange: Observable<void>;
  @Input() columns: string[];
  @Input() resizeColumns: boolean = false;
  @Input() orderColumns: boolean = false;
  @Input() sortColumns: boolean = false;
  @Input() toggleColumns: boolean = false;
  @Input() dragSortRows: boolean = false;

  destroyRef:DestroyRef = inject(DestroyRef);

  constructor(
    public datagridTableService: DatagridTableService,
    private el: ElementRef,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.setTableStateProperties();
    this.handleRenderRows();
    this.setTableData();
  }

  ngAfterViewInit(): void {
    this.setTableRefs();
    this.datagridTableService.triggerStateChange();
  }

  ngAfterContentInit() {
    this.columnDefs.forEach(columnDef => this.table.addColumnDef(columnDef));
    this.rowDefs.forEach(rowDef => this.table.addRowDef(rowDef));
    this.headerRowDefs.forEach(headerRowDef => this.table.addHeaderRowDef(headerRowDef));
  }

  //################################################

  handleExternalStateChange(): void {
    if(this.stateChange) {
      this.stateChange.subscribe({
        next: () => {
          this.datagridTableService.triggerStateChange();
          this.datagridTableService.refresh();
        }
      })
    }
  }

  //################################################

  setTableData(): void {
    this.datagridTableService.setDataSource(this.dataSource);
  }

  //################################################

  setTableStateProperties(): void {
    this.datagridTableService.state.columns = this.columns;
    this.datagridTableService.state.displayedColumns = _.clone(this.columns);
    this.datagridTableService.state.resizeColumns = this.resizeColumns;
    this.datagridTableService.state.orderColumns = this.orderColumns;
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
    if(this.stateChange) {
      this.stateChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: () => {
          this.datagridTableService.refresh();
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
