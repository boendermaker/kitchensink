import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';

@Component({
  selector: 'app-selectcontrol',
  standalone: true,
  imports: [CommonModule, AllAngularMaterialMDCModulesModule, ReactiveFormsModule, FormsModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {

  @Input() control: AbstractControl<any|any>;

  constructor() {

  }

}
