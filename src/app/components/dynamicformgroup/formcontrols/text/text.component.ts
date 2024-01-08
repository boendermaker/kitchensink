import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-textcontrol',
  standalone: true,
  imports: [CommonModule, AllAngularMaterialMDCModulesModule, ReactiveFormsModule, FormsModule],
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent {

  @Input() control: AbstractControl<any|any>;

  constructor() {

  }

}
