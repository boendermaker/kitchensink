import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-textcontrol',
  standalone: true,
  imports: [CommonModule, AllAngularMaterialMDCModulesModule],
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent {

  @Input() formcontrolname: string;

  controlContainer = inject(ControlContainer);

  constructor() {

  }

}
