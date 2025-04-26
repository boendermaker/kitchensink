import { AfterViewInit, Component, ContentChild, HostBinding, Input, OnDestroy, OnInit, Optional, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { MatCellDef, MatColumnDef, MatFooterCellDef, MatHeaderCellDef, MatTable } from '@angular/material/table';
import { DatagridTableComponent } from "../datagridtable.component";
import { DatagridTableColumnComponent } from "../column/column.component";
import { DatagridTableService } from '../datagridtable.service';
import { CdkColumnDef } from '@angular/cdk/table';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-datagridtable-selectioncolumn',
  imports: [MatColumnDef, MatCellDef, MatHeaderCellDef, NgTemplateOutlet],
  templateUrl: './selectioncolumn.component.html',
  styleUrls: ['./selectioncolumn.component.scss'],
  host: {
    class: 'column-template cdk-visually-hidden',
    '[attr.ariaHidden]': 'true',
  },
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

  @ContentChild('cell', { static: false })
  cellTemplate: TemplateRef<unknown> | null = null;

  ngOnInit(): void {
    if (this.columnDef) {
      this.columnDef.name = this.columnName;
      this.columnDef.cell = this.cellDef;
      this.columnDef.headerCell = this.headerCellDef;
      this.datagridTableService.state.tableInstanceRef.addColumnDef(this.columnDef);
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

