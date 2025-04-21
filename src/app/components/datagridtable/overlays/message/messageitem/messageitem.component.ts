import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DatagridTableService } from '@app/components/datagridtable/datagridtable.service';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';

@Component({
  selector: 'app-datagridtable-messageitem',
  imports: [AllAngularMaterialMDCModulesModule, NgClass],
  templateUrl: './messageitem.component.html',
  styleUrl: './messageitem.component.scss'
})
export class DatagridTableMessageitemComponent {

  @Input() type: 'info' | 'error' | 'warning' | 'success' = 'info';
  @Input() content: string = '';

  icon: {[p:string]: string} = {
    info: 'info',
    warning: 'warning',
    error: 'error',
    success: 'check_circle'
  }

  constructor(
    public datagridTableService: DatagridTableService,
  ) {

  }

}
