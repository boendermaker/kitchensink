import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, computed, ContentChildren, OnInit, Optional, QueryList, WritableSignal } from '@angular/core';
import { DatagridTableService } from '../datagridtable.service';
import { DatagridTableComponent } from '../datagridtable.component';
import { BehaviorSubject } from 'rxjs';
import { DatagridTableColumnComponent } from '../column/column.component';

@Component({
  selector: 'app-datagridtable-actions',
  standalone: true,
  imports: [],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.scss'
})
export class DatagridTableActionsComponent implements OnInit, AfterViewInit, AfterContentInit {

  @ContentChildren('actions') tableActions: QueryList<any>;

  constructor(
    private datagridTableService: DatagridTableService,
    private cdr: ChangeDetectorRef,
    @Optional() public tester?: DatagridTableColumnComponent,
  ) {
  }

  ngOnInit() {
    console.log('TABLESERICE ACTIONS ', this.tester);
  }

  ngAfterViewInit() {

  }

  ngAfterContentInit() {
    console.log('Actions Content Init', this.tableActions);
    this.tableActions.changes.subscribe((item) => {
      console.log('ITEM ', item)
    })
  }
}
