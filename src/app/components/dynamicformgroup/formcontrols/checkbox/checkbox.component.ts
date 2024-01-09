import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IFormGroupBuilderControlCheckbox } from '../../formgroupbuilder.interface';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkboxcontrol',
  standalone: true,
  imports: [CommonModule, AllAngularMaterialMDCModulesModule, ReactiveFormsModule, FormsModule],
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  @Input() control: IFormGroupBuilderControlCheckbox;

  constructor() {
    
  }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.control.instance.patchValue(this.control.attributes.selected);
  }

}
