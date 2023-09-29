import { Component, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, FormBuilder, FormGroup, UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dynamicform',
  templateUrl: './dynamicform.component.html',
  styleUrls: ['./dynamicform.component.scss']
})
export class DynamicformComponent implements OnInit {

<<<<<<< HEAD
=======
  dataSource: MatTableDataSource<AbstractControl>;
  form: UntypedFormGroup;

>>>>>>> d3cef95c7dce72cdda8a6026888d413202611349
  constructor() {
  }

  ngOnInit(): void {
    console.log();
  }

}
