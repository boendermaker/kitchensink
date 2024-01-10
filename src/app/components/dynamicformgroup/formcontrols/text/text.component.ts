import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlTextModel } from '../../model/control.text.model.class';

@Component({
  selector: 'app-textcontrol',
  standalone: true,
  imports: [CommonModule, AllAngularMaterialMDCModulesModule, ReactiveFormsModule, FormsModule],
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {

  @Input() control: ControlTextModel;

  constructor() {
  }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.control.options.value ?  this.control.instance.patchValue(this.control.options.value) : null;
  }

}