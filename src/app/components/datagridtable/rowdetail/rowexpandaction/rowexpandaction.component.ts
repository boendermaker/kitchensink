import { Component, Input, Optional } from '@angular/core';
import { Data } from '@angular/router';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { DatagridTableService } from '../../datagridtable.service';

/**
 * Component to handle row expand actions in a datagrid table.
 * This component allows users to expand or collapse rows in the datagrid.
 * Input: `row` - The data of *matCellDef of row to be expanded or collapsed.
 */
@Component({
  selector: 'app-datagridtable-rowexpandaction',
  imports: [AllAngularMaterialMDCModulesModule],
  templateUrl: './rowexpandaction.component.html',
  styleUrl: './rowexpandaction.component.scss'
})
export class DatagridTableRowExpandActionComponent {

  @Input() row: any;

  constructor(
    public datagridTableService: DatagridTableService
  ) {
  }

  toggleRowExpand(): void {
    this.datagridTableService.toggleExpandedRow(this.row);
  }

}
