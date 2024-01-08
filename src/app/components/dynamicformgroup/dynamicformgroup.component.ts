import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlContainer, Form, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IDynamicFormGroup } from './dynamicformgroup.interface';
import { TextComponent } from "./formcontrols/text/text.component";
import { SelectComponent } from "./formcontrols/select/select.component";

@Component({
    selector: 'app-dynamicformgroup',
    standalone: true,
    templateUrl: './dynamicformgroup.component.html',
    styleUrls: ['./dynamicformgroup.component.scss'],
    imports: [CommonModule, ReactiveFormsModule, TextComponent, SelectComponent]
})
export class DynamicformgroupComponent implements OnInit {

  controlContainer = inject(ControlContainer);

  @Input() controls: IDynamicFormGroup;
  parentFormGroup: FormGroup = new FormGroup({});

  constructor() {
  }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.parentFormGroup = <FormGroup>this.controlContainer.control;
  }
  
  setInitialValues(): void {
    
  }

}
