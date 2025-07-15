import { AfterViewInit, Component, ContentChild, HostBinding, Input, OnDestroy, OnInit, Optional, TemplateRef, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { MatCellDef, MatColumnDef, MatFooterCellDef, MatHeaderCellDef, MatTable, MatTableModule } from '@angular/material/table';
import { DatagridTableService } from '../datagridtable.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-datagridtable-selectioncolumn',
  imports: [MatColumnDef, MatCellDef, MatHeaderCellDef, MatTableModule, MatCheckboxModule],
  templateUrl: './selectioncolumn.component.html',
  styleUrls: ['./selectioncolumn.component.scss'],
})
export class SelectioncolumnComponent implements OnDestroy, OnInit {

  @Input() matColumnDef: string = 'selection';
  selectionModel: SelectionModel<unknown> = this.datagridTableService.state.rowSelection;

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
      this.columnDef.name = this.matColumnDef;
      this.columnDef.cell = this.cellDef;
      this.columnDef.headerCell = this.headerCellDef;
      this.datagridTableService.state.tableInstanceRef.addColumnDef(this.columnDef);
    }
  }

  ngOnDestroy(): void {
    this.datagridTableService.state.tableInstanceRef.removeColumnDef(this.columnDef);
  }

  isAllSelected() {
    const numSelected = this.selectionModel.selected.length;
    const numRows = this.datagridTableService.state.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selectionModel.clear();
      return;
    }
    this.selectionModel.select(...this.datagridTableService.state.dataSource.data);
  }

}

