import { Component, computed, Input, OnInit, Optional, Signal, WritableSignal } from '@angular/core';
import { DatagridTableColumnComponent } from '../../column/column.component';
import { DatagridTableService } from '../../datagridtable.service';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { NgStyle } from '@angular/common';
import { EDatagridTableStateChangeEvents } from '../../interfaces/statechangetypes.enum';

@Component({
  selector: 'app-datagridtable-ordercolumn',
  imports: [AllAngularMaterialMDCModulesModule, NgStyle],
  templateUrl: './ordercolumn.component.html',
  styleUrl: './ordercolumn.component.scss'
})
export class DatagridTableOrderColumnComponent implements OnInit {

  columnName: string = '';
  $columnIndex: Signal<number> = this.datagridTableColumnComponentRef.getColumnIndex();

  constructor(
    public datagridTableService: DatagridTableService,
    @Optional() public datagridTableColumnComponentRef: DatagridTableColumnComponent,
  ) {

  }

  ngOnInit(): void {
    this.getColumnName();
  }

  //###########################

  private getColumnName(): void {
    this.columnName = this.datagridTableColumnComponentRef.getColumnName();
  }

  //###########################

  orderColumn(direction: 'left' | 'right'): void {
    this.datagridTableService.orderColumn(this.columnName, direction)
    this.datagridTableService.triggerStateChange(EDatagridTableStateChangeEvents.CHANGE_COLUMN_ORDER);
  }

  //###########################

}
