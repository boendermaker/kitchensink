import { Component } from '@angular/core';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { DatagridTableService } from '../../datagridtable.service';

@Component({
  selector: 'app-datagridtable-messageoverlay',
  imports: [AllAngularMaterialMDCModulesModule],
  templateUrl: './messageoverlay.component.html',
  styleUrl: './messageoverlay.component.scss'
})
export class DatagridTableMessageOverlayComponent {

  constructor(
    public datagridTableService: DatagridTableService
  ) {

  }

}
