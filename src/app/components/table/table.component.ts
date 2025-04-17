import { Component, Input, OnInit, Output } from '@angular/core';
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: false,
})
export class TableComponent implements OnInit {

  @Input() datasource: any[] = [];
  @Input() datacount: number = 0;
  @Output() page: PageEvent;

  constructor() {

  }

  ngOnInit(): void {

  }

}
