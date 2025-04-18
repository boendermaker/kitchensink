import { Component, Input } from '@angular/core';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';

@Component({
  selector: 'app-datagridtable-title',
  standalone: true,
  imports: [AllAngularMaterialMDCModulesModule],
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss'
})
export class DatagridTableTitleComponent {

  @Input() title: string;

  constructor() {

  }

}
