import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlCheckboxModel } from '../../model/control.checkbox.model.class';

@Component({
  selector: 'app-checkboxcontrol',
  standalone: true,
  imports: [CommonModule, AllAngularMaterialMDCModulesModule, ReactiveFormsModule, FormsModule],
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  @Input() control: ControlCheckboxModel;

  constructor() {
    
  }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.control.instance.patchValue(this.control.attributes.selected);
  }

}
