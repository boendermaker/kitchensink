import { Component, ElementRef, HostBinding, Input, ViewChild } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { MatCellDef } from '@angular/material/table';

@Component({
  selector: 'app-datagridtable-cell',
  standalone: true,
  imports: [],
  templateUrl: './cell.component.html',
})
export class DatagridTableCellComponent {

  @Input() cellDef: MatCellDef;
  tester: string = '';

  constructor(private elementRef: ElementRef) {

  }

  ngAfterViewInit(): void {
    //console.log('CELLDEF ', this.cellDef);
  }

}
