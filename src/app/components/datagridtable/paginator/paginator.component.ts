import { Component, Optional, ViewChild } from '@angular/core';
import { Options } from 'blockly';
import { DatagridTableComponent } from '../datagridtable.component';
import { DatagridTableService } from '../datagridtable.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-datagridtable-paginator',
  imports: [],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class DatagridTablePaginatorComponent {

  @ViewChild('paginator') paginator: MatPaginator;

  constructor(
    private datagridTableService: DatagridTableService,
    @Optional() public datagridTableComponentRef: DatagridTableComponent,
  ) {

  }



}
