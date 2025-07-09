import { Component, Input, Optional } from '@angular/core';
import { Data } from '@angular/router';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { DatagridTableService } from '../../datagridtable.service';

@Component({
  selector: 'app-datagridtable-rowexpandaction',
  imports: [AllAngularMaterialMDCModulesModule],
  templateUrl: './rowexpandaction.component.html',
  styleUrl: './rowexpandaction.component.scss'
})
export class DatagridTableRowExpandActionComponent {

  @Input() element: any;

  constructor(
    public datagridTableService: DatagridTableService
  ) {
  }

  toggleRowExpand(): void {
    this.datagridTableService.toggleExpandedRow(this.element);
  }

}
