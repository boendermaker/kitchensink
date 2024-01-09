import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { IFormGroupBuilderControlCheckbox, IFormGroupBuilderControlRadio, IFormGroupBuilderControlSelect, IFormGroupBuilderControlText, IFormGroupBuilder, IFormGroupBuilderControl } from '@app/components/dynamicformgroup/formgroupbuilder.interface';

@Component({
  selector: 'app-dynamicform',
  templateUrl: './dynamicform.component.html',
  styleUrls: ['./dynamicform.component.scss']
})
export class DynamicformComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  personalControls: IFormGroupBuilderControl[] = [
    <IFormGroupBuilderControlText>{
      name: 'vorname',
      type: 'text',
      instance: new FormControl(''),
      value: 'Lorem',
      attributes: {label: 'Vorname'},
      order: 0
    },
    <IFormGroupBuilderControlText>{
      name: 'nachname',
      type: 'text',
      instance: new FormControl(''),
      value: '',
      attributes: {label: 'Nachname'},
      order: 1
    },
    <IFormGroupBuilderControlSelect>{
      name: 'testselect',
      type: 'select',
      instance: new FormControl(''),
      value: [{label: 'Test1', value: 'Selected1'}, {label: 'Test2', value: 'Selected2'}],
      attributes: {label: 'Auswahltest', selected: null},
      order: 2
    },
    <IFormGroupBuilderControlCheckbox>{
      name: 'testcheckbox',
      type: 'checkbox',
      instance: new FormControl(''),
      value: 0,
      attributes: {label: 'Auswahltest', selected: true},
      order: 3
    },
    <IFormGroupBuilderControlCheckbox>{
      name: 'testcheckbox2',
      type: 'checkbox',
      instance: new FormControl(''),
      value: 'Lorem Ipsum2',
      attributes: {label: 'Auswahltest2', selected: false},
      order: 4
    },
    <IFormGroupBuilderControlRadio>{
      name: 'testradio',
      type: 'radio',
      instance: new FormControl(''),
      value: [{label: 'Radio1', value: 'RadioSelected1'}, {label: 'Radio2', value: 'RadioSelected2'}],
      attributes: {label: 'Auswahltest', selected: 'RadioSelected2'},
      order: 5
    }
  ];

  constructor() {

  }

  ngOnInit(): void {
    console.log();
  }

}
