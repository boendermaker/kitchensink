import { AfterContentInit, Component, ContentChild, ContentChildren, input, Input, OnInit, QueryList, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource, MatTable, MatNoDataRow, MatColumnDef, MatRowDef, MatHeaderRowDef } from '@angular/material/table';

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
  imports: [MatTableModule],
  templateUrl: './datagridtable.component.html',
  styleUrl: './datagridtable.component.scss'
})
export class DatagridtableComponent implements AfterContentInit {

  @ContentChildren(MatHeaderRowDef) headerRowDefs: QueryList<MatHeaderRowDef>;
  @ContentChildren(MatRowDef) rowDefs: QueryList<MatRowDef<any>>;
  @ContentChildren(MatColumnDef) columnDefs: QueryList<MatColumnDef>;

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  @Input() dataSource: any[];
  @Input() columns: string[];

  ngAfterContentInit() {
    this.columnDefs.forEach(columnDef => this.table.addColumnDef(columnDef));
    this.rowDefs.forEach(rowDef => this.table.addRowDef(rowDef));
    this.headerRowDefs.forEach(headerRowDef => this.table.addHeaderRowDef(headerRowDef));
  }

}
