import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDynamicFormControlSelect, IDynamicFormControlText, IDynamicFormGroup } from '@app/components/dynamicformgroup/dynamicformgroup.interface';

@Component({
  selector: 'app-dynamicform',
  templateUrl: './dynamicform.component.html',
  styleUrls: ['./dynamicform.component.scss']
})
export class DynamicformComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  personalControls: IDynamicFormGroup = [
    <IDynamicFormControlText>{
      name: 'vorname',
      type: 'text',
      instance: new FormControl(''),
      value: '',
      attributes: {label: 'Vorname'},
      order: 0
    },
    <IDynamicFormControlText>{
      name: 'nachname',
      type: 'text',
      instance: new FormControl(''),
      value: '',
      attributes: {label: 'Nachname'},
      order: 1
    },
    <IDynamicFormControlSelect>{
      name: 'testselect',
      type: 'select',
      instance: new FormControl(''),
      value: [{label: 'Test1', value: 'Selected1'}, {label: 'Test2', value: 'Selected2'}],
      attributes: {label: 'Auswahltest'},
      order: 2
    }
  ];

  constructor() {

  }

  ngOnInit(): void {
    console.log();
  }

}
