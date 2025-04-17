import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ControlCheckboxModel } from '@app/components/dynamicformgroup/model/control.checkbox.model.class';
import { ControlRadioModel } from '@app/components/dynamicformgroup/model/control.radio.model.class';
import { ControlSelectModel } from '@app/components/dynamicformgroup/model/control.select.model.class';
import { ControlTextModel } from '@app/components/dynamicformgroup/model/control.text.model.class';

@Component({
  selector: 'app-dynamicform',
  templateUrl: './dynamicform.component.html',
  styleUrls: ['./dynamicform.component.scss'],
  standalone: false,
})
export class DynamicformComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  testControls = [

    new ControlTextModel(
      'Testinput', 
      new FormControl(''), 
      {value: 'Lorem'}, 
      {label: 'Vorname'}, 
      0
    ),
    new ControlSelectModel(
      'TestSelect', 
      new FormControl(''), 
      [{label: 'Selectitem1', value: 0}, {label: 'Selectitem2', value: 1}], 
      {label: 'Vorname', selected: 1}, 
      1
    ),
    new ControlCheckboxModel(
      'TestCheckbox', 
      new FormControl(''), 
      {value: 'Lorem'}, 
      {label: 'Vorname', selected: false}, 
      2
    ),
    new ControlRadioModel(
      'TestRadio', 
      new FormControl(''), 
      [{label: 'TestRadio1', value: 0}, {label: 'TestRadio2', value: 1}], 
      {label: 'Vorname', selected: 0}, 
      3
    ),

  ]

  constructor() {
    console.log(

      this.testControls

    )
  }

  ngOnInit(): void {
    console.log();
  }

}
