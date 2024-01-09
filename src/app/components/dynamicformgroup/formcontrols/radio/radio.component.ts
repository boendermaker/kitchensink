import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IFormGroupBuilderControlRadio } from '../../formgroupbuilder.interface';

@Component({
  selector: 'app-radiocontrol',
  standalone: true,
  imports: [CommonModule, AllAngularMaterialMDCModulesModule, ReactiveFormsModule, FormsModule],
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent {

  @Input() control: IFormGroupBuilderControlRadio;

  constructor() {
    
  }

}
