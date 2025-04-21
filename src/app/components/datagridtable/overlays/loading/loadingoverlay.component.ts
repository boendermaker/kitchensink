import { Component } from '@angular/core';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { DatagridTableService } from '../../datagridtable.service';

@Component({
  selector: 'app-datagridtable-loadingoverlay',
  imports: [AllAngularMaterialMDCModulesModule],
  templateUrl: './loadingoverlay.component.html',
  styleUrl: './loadingoverlay.component.scss'
})
export class DatagridTableLoadingOverlayComponent {

  constructor(
    public datagridTableService: DatagridTableService
  ) {

  }

}
