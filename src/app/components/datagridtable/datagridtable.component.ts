import { CdkDrag, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ContentChild, ContentChildren, DestroyRef, ElementRef, EventEmitter, inject, Input, Output, QueryList, Renderer2, ViewChild } from '@angular/core';
import { MatTableModule, MatTable, MatColumnDef, MatRowDef, MatHeaderRowDef, MatTableDataSource } from '@angular/material/table';
import { DatagridTableService } from './datagridtable.service';
import { DatagridTableActionsComponent } from './actions/actions.component';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AllAngularMaterialMDCModulesModule } from '../../shared/modules/allmaterial/allmaterial.module';
import { MatSort } from '@angular/material/sort';
import { EDatagridTableStateChangeEvents } from './interfaces/statechangetypes.enum';


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
  @ViewChild(MatSort) sort!: MatSort;

  @Input() tableId: string;
  @Input() dataSource: MatTableDataSource<unknown>;
  @Input() columns: string[];
  @Input() dragSortRows: boolean = false;
  @Output() service: EventEmitter<DatagridTableService> = new EventEmitter<DatagridTableService>();

  destroyRef:DestroyRef = inject(DestroyRef);

  constructor(
    public datagridTableService: DatagridTableService,
    public elementRef: ElementRef,
    public renderer: Renderer2,
  ) {

  }

  ngOnInit(): void {
    this.datagridTableService.setTableInstanceRef(this.table);
    this.datagridTableService.setTableComponentRef(this);
    this.setTableStateProperties();
    this.setTableData();
  }

  ngAfterViewInit(): void {
    this.datagridTableService.setTableElementRef(this.tableElementRef);
    this.datagridTableService.setInitialTableHeaderWidths();
    this.datagridTableService.setSort(this.sort);
    this.service.emit(this.datagridTableService);
    this.datagridTableService.triggerStateChange(EDatagridTableStateChangeEvents.CHANGE_DATA);
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

  setTableStateProperties(): void {
    this.datagridTableService.setColumns(this.columns);
    this.datagridTableService.setDisplayedColumns(_.clone(this.columns));
    this.datagridTableService.setDragSortRows(this.dragSortRows);
  }

  //################################################

  rowDropped(e): void {
    const data = this.datagridTableService.state.dataSource.data;
    moveItemInArray(data, e.previousIndex, e.currentIndex);
    this.dataSource.connect().next(data);
  }

  //################################################



  //################################################


}
