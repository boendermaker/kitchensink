import { Component } from '@angular/core';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { DatagridTableService } from '../datagridtable.service';

@Component({
  selector: 'app-datagridtable-loadingindicator',
  imports: [AllAngularMaterialMDCModulesModule],
  templateUrl: './loadingindicator.component.html',
  styleUrl: './loadingindicator.component.scss'
})
export class DatagridTableLoadingIndicatorComponent {

  constructor(
    public datagridTableService: DatagridTableService
  ) {

  }

}
