import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, computed, contentChild, ContentChild, ContentChildren, effect, ElementRef, Input, QueryList } from '@angular/core';
import { DatagridTableHeaderComponent } from '../header/header.component';
import { DatagridTableCellComponent } from '../cell/cell.component';
import { MatColumnDef } from '@angular/material/table';
import { DatagridTableService } from '../datagridtable.service';
import { combineLatest, firstValueFrom, forkJoin } from 'rxjs';

@Component({
  selector: 'app-datagridtablecolumn',
  standalone: true,
  imports: [],
  templateUrl: './column.component.html',
  styleUrl: './column.component.scss',
})
export class DatagridTableColumnComponent implements AfterViewInit, AfterContentInit {

  @ContentChildren(DatagridTableHeaderComponent, {descendants: true}) headerElements: QueryList<DatagridTableHeaderComponent>;
  @ContentChildren(DatagridTableCellComponent, {descendants: true}) cellElements: QueryList<DatagridTableCellComponent>;
  @Input() matColumnDef: MatColumnDef;

  constructor(
    private datagridTableService: DatagridTableService,
  ) {
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    console.log();
  }

  ngAfterContentInit() {
    this.getColumnComponents();
  }

  getColumnComponents() {
    combineLatest({
      headerCells: this.headerElements.changes,
      columnCells: this.cellElements.changes
    }).subscribe(({headerCells, columnCells}) => {
      headerCells = headerCells.toArray()[0];
      columnCells = columnCells.toArray()[0];
      console.log('HEADER ELEMENTS ', this.matColumnDef, headerCells, columnCells);
    });
  }

}
