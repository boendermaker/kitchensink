import { Component } from '@angular/core';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { DatagridTableService } from '../datagridtable.service';

@Component({
  selector: 'app-datagridtable-selectionactions',
  imports: [AllAngularMaterialMDCModulesModule],
  templateUrl: './selectionactions.component.html',
  styleUrl: './selectionactions.component.scss'
})
export class SelectionsComponent {

  constructor(
    public datagridTableService: DatagridTableService
  ) {

  }

  ngOnInit(): void {

  }

  //###########################


  
  //###########################

}
