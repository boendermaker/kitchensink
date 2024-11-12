import { AfterContentInit, Component, ContentChild, ContentChildren, EventEmitter, HostBinding, Input, Output, QueryList, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableModule, MatTable, MatColumnDef, MatRowDef, MatHeaderRowDef } from '@angular/material/table';

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
export class DatagridTableComponent implements AfterContentInit {

  @ContentChildren(MatHeaderRowDef) headerRowDefs: QueryList<MatHeaderRowDef>;
  @ContentChildren(MatRowDef) rowDefs: QueryList<MatRowDef<any>>;
  @ContentChildren(MatColumnDef) columnDefs: QueryList<MatColumnDef>;

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  @Output() tableInstance = new EventEmitter<MatTable<any>>();

  @Input() dataSource: any[];
  @Input() columns: string[];

  ngAfterContentInit() {
    this.columnDefs.forEach(columnDef => this.table.addColumnDef(columnDef));
    this.rowDefs.forEach(rowDef => this.table.addRowDef(rowDef));
    this.headerRowDefs.forEach(headerRowDef => this.table.addHeaderRowDef(headerRowDef));
    this.tableInstance.emit(this.table);
  }

}
