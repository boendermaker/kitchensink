import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, computed, contentChild, ContentChild, ContentChildren, DestroyRef, effect, ElementRef, inject, Input, OnInit, QueryList, signal, Signal, WritableSignal } from '@angular/core';
import { DatagridTableHeaderComponent } from '../header/header.component';
import { DatagridTableCellComponent } from '../cell/cell.component';
import { MatColumnDef } from '@angular/material/table';
import { DatagridTableService } from '../datagridtable.service';
import { combineLatest, firstValueFrom, forkJoin } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-datagridtablecolumn',
  standalone: true,
  imports: [],
  templateUrl: './column.component.html',
  styleUrl: './column.component.scss',
})
export class DatagridTableColumnComponent implements OnInit, AfterContentInit {

  @ContentChildren(DatagridTableHeaderComponent, {descendants: true}) headerElements: QueryList<DatagridTableHeaderComponent>;
  @ContentChildren(DatagridTableCellComponent, {descendants: true}) cellElements: QueryList<DatagridTableCellComponent>;
  @Input() matColumnDef: MatColumnDef;

  private destroyRef: DestroyRef = inject(DestroyRef);
  private $columnIndex: WritableSignal<number> = signal(-1);

  constructor(
    private datagridTableService: DatagridTableService,
  ) {
  }

  ngOnInit(): void {
    this.handleStateChange();
  }

  ngAfterContentInit() {
    this.getColumnComponents();
  }

  //###########################

  getColumnIndex(): Signal<number> {
    return this.$columnIndex.asReadonly();
  }

  //###########################

  getColumnName(): string {
    return this.matColumnDef.toString();
  }

  //###########################

  private handleStateChange() {
    this.datagridTableService.stateChange_.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (state) => {
        this.$columnIndex.set(this.datagridTableService.getColumnIndex(this.getColumnName()));
      },
    })
  }

  //###########################

  private getColumnComponents() {
    combineLatest({
      headerCells: this.headerElements.changes,
      columnCells: this.cellElements.changes
    }).subscribe(({headerCells, columnCells}) => {
      headerCells = headerCells.toArray()[0];
      columnCells = columnCells.toArray()[0];
      console.log('HEADER ELEMENTS ', this.matColumnDef, headerCells, columnCells);
    });
  }

  //###########################

}
