import { AfterContentInit, AfterViewInit, Component, ContentChildren, ElementRef, QueryList } from '@angular/core';
import { DatagridTableHeaderComponent } from '../header/header.component';
import { DatagridTableCellComponent } from '../cell/cell.component';

@Component({
  selector: 'app-datagridtablecolumn',
  standalone: true,
  imports: [],
  templateUrl: './column.component.html',
  styleUrl: './column.component.scss'
})
export class DatagridTableColumnComponent implements AfterContentInit {

  @ContentChildren(DatagridTableHeaderComponent, {read: ElementRef}) header: QueryList<ElementRef>;

  headerElements: ElementRef[] = [];

  constructor() {
  }

  ngAfterContentInit(): void {
    this.getHeader();
  }

  getHeader(): void {
    this.header.changes.subscribe((header) => {
      header.toArray().forEach(headerItem => {
        this.headerElements.push(headerItem.nativeElement);
      });
    });
  }

}
