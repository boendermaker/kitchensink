import { AfterViewInit, Component, HostBinding, Input, OnDestroy, OnInit, Optional, ViewChild, ViewChildren } from '@angular/core';
import { MatCellDef, MatColumnDef, MatFooterCellDef, MatHeaderCellDef, MatTable } from '@angular/material/table';
import { DatagridTableComponent } from "../datagridtable.component";
import { DatagridTableColumnComponent } from "../column/column.component";
import { DatagridTableService } from '../datagridtable.service';
import { CdkColumnDef } from '@angular/cdk/table';

@Component({
  selector: 'app-datagridtable-selectioncolumn',
  imports: [MatColumnDef, MatCellDef, MatHeaderCellDef],
  templateUrl: './selectioncolumn.component.html',
  styleUrl: './selectioncolumn.component.scss'
})
export class SelectioncolumnComponent implements AfterViewInit, OnDestroy, OnInit {

  @Input() columnName: string = 'selection';

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
      this.datagridTableService.state.tableInstanceRef.addColumnDef(this.columnDef);
      this.columnDef.cell = this.cellDef;
      this.columnDef.headerCell = this.headerCellDef;
    }
    console.log('COLUMNDEF ', this.columnDef);
  }

  ngAfterViewInit(): void {
    this.datagridTableService.refresh();
  }

  ngOnDestroy(): void {
    this.datagridTableService.state.tableInstanceRef.removeColumnDef(this.columnDef);
  }

}

