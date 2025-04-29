import { AfterViewInit, Component, ContentChild, DestroyRef, HostBinding, inject, Input, OnDestroy, OnInit, Optional, TemplateRef, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { MatCellDef, MatColumnDef, MatFooterCellDef, MatHeaderCellDef, MatTable, MatTableModule } from '@angular/material/table';
import { DatagridTableService } from '../datagridtable.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { EDatagridTableStateChangeEvents } from '../interfaces/statechangetypes.enum';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-datagridtable-selectioncolumn',
  imports: [MatColumnDef, MatCellDef, MatHeaderCellDef, MatTableModule, MatCheckboxModule],
  templateUrl: './selectioncolumn.component.html',
  styleUrls: ['./selectioncolumn.component.scss'],
})
export class SelectioncolumnComponent implements OnDestroy, OnInit {

  destroyRef: DestroyRef = inject(DestroyRef);

  @Input() columnName: string = 'selection';
  @Input() multiple: boolean = true;
  selection: SelectionModel<unknown> = this.datagridTableService.state.rowSelection;

  constructor(
    private datagridTableService: DatagridTableService,
  ) {}

  @HostBinding('attr.ariaHidden') ariaHidden!: true;
  @HostBinding('class') classes!: 'column-template Mat-visually-hidden';

  @ViewChild(MatColumnDef, {static: true}) columnDef!: MatColumnDef;
  @ViewChild(MatCellDef, {static: true}) cellDef!: MatCellDef;
  @ViewChild(MatHeaderCellDef, {static: true}) headerCellDef!: MatHeaderCellDef;
  @ViewChild(MatFooterCellDef, {static: true}) footerCellDef!: MatFooterCellDef;

  ngOnInit(): void {
    if (this.columnDef) {
      this.columnDef.name = this.columnName;
      this.columnDef.cell = this.cellDef;
      this.columnDef.headerCell = this.headerCellDef;
      this.datagridTableService.state.tableInstanceRef.addColumnDef(this.columnDef);
      this.setSelectionOptions();
      this.handleSelectionChange();
    }
  }

  ngOnDestroy(): void {
    this.datagridTableService.state.tableInstanceRef.removeColumnDef(this.columnDef);
  }

  handleSelectionChange(): void {
    this.datagridTableService.state.rowSelection.changed.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (selection) => {
        this.datagridTableService.state.$selectedRows.set(this.selection.selected);
        this.datagridTableService.triggerStateChange(EDatagridTableStateChangeEvents.CHANGE_SELECTION_ROW);
      }
    })
  }

  setSelectionOptions(): void {
    this.datagridTableService.state.rowSelection = new SelectionModel(this.multiple, []);
    this.selection = this.datagridTableService.state.rowSelection;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.datagridTableService.state.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.datagridTableService.state.dataSource.data);
  }

}

