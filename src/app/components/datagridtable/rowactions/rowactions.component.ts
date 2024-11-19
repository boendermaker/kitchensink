import { AfterViewInit, Component, ContentChildren, ElementRef, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { MatHeaderRowDef } from '@angular/material/table';

@Component({
  selector: 'app-datagridtable-rowactions',
  standalone: true,
  imports: [],
  templateUrl: './rowactions.component.html',
  styleUrl: './rowactions.component.scss'
})
export class RowactionsComponent implements AfterViewInit {

  @ViewChild(RowactionsComponent, {read: ElementRef}) headerRowDefs: QueryList<ElementRef>;

  constructor() {

  }

  ngAfterViewInit(): void {
    
  }

}
