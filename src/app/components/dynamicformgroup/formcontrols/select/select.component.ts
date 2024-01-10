import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { ControlSelectModel } from '../../model/control.select.model.class';

@Component({
  selector: 'app-selectcontrol',
  standalone: true,
  imports: [CommonModule, AllAngularMaterialMDCModulesModule, ReactiveFormsModule, FormsModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {

  @Input() control: ControlSelectModel;

  constructor() {
  }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.control.attributes.selected ? this.control.instance.patchValue(this.control.attributes.selected) : null;
  }

}
