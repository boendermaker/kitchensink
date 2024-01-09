import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlContainer, Form, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IFormGroupBuilder, IFormGroupBuilderControl } from './formgroupbuilder.interface';
import { TextComponent } from "./formcontrols/text/text.component";
import { SelectComponent } from "./formcontrols/select/select.component";
import { RadioComponent } from "./formcontrols/radio/radio.component";
import { CheckboxComponent } from "./formcontrols/checkbox/checkbox.component";

@Component({
    selector: 'app-formgroupbuilder',
    standalone: true,
    templateUrl: './formgroupbuilder.component.html',
    styleUrls: ['./formgroupbuilder.component.scss'],
    imports: [CommonModule, ReactiveFormsModule, TextComponent, SelectComponent, RadioComponent, CheckboxComponent]
})
export class FormgroupbuilderComponent implements OnInit {

  controlContainer = inject(ControlContainer);

  @Input() controls: IFormGroupBuilderControl[];
  parentFormGroup: FormGroup = new FormGroup({});

  constructor() {
  }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.parentFormGroup = <FormGroup>this.controlContainer.control;
  }

}
