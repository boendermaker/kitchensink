import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, computed, OnInit, Optional, WritableSignal } from '@angular/core';
import { DatagridTableService } from '../datagridtable.service';
import { DatagridTableComponent } from '../datagridtable.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-datagridtable-actions',
  standalone: true,
  imports: [],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.scss'
})
export class DatagridTableActionsComponent implements OnInit, AfterViewInit, AfterContentInit {

  ref: DatagridTableComponent;

  constructor(
    private datagridTableService: DatagridTableService,
    private cdr: ChangeDetectorRef,
    @Optional() public parent?: DatagridTableComponent,
  ) {
  }

  ngOnInit() {
    this.parent.tester();
  }

  ngAfterViewInit() {
  }

  ngAfterContentInit() {
  }
}
