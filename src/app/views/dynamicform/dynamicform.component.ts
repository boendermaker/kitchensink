import { Component, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, FormBuilder, FormGroup, UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dynamicform',
  templateUrl: './dynamicform.component.html',
  styleUrls: ['./dynamicform.component.scss']
})
export class DynamicformComponent implements OnInit {

  dataSource: MatTableDataSource<AbstractControl>;
  form: UntypedFormGroup;

  constructor() {
  }

  ngOnInit(): void {
    console.log();
  }

}
