import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DatagridTableService } from '../datagridtable.service';

@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.scss'
})
export class DatagridTableActionsComponent implements OnInit, AfterViewInit {

  constructor(private datagridTableService: DatagridTableService) {

  }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    console.log('X ', this.datagridTableService)
  }

}
