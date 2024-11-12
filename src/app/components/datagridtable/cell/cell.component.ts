import { Component, HostBinding } from '@angular/core';

@Component({
  selector: '[datagridtablecell]',
  standalone: true,
  imports: [],
  templateUrl: './cell.component.html',
  styleUrl: './cell.component.scss'
})
export class DatagridTableCellComponent {

  @HostBinding('class') materialTableCellClasses = 'mat-mdc-cell mdc-data-table__cell cdk-cell';

  constructor() {

  }

}
