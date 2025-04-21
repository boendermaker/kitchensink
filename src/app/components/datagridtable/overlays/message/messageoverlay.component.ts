import { Component } from '@angular/core';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { DatagridTableService } from '../../datagridtable.service';
import { DatagridTableMessageitemComponent } from "./messageitem/messageitem.component";

@Component({
  selector: 'app-datagridtable-messageoverlay',
  imports: [AllAngularMaterialMDCModulesModule, DatagridTableMessageitemComponent],
  templateUrl: './messageoverlay.component.html',
  styleUrl: './messageoverlay.component.scss'
})
export class DatagridTableMessageOverlayComponent {

  constructor(
    public datagridTableService: DatagridTableService
  ) {

  }

}
