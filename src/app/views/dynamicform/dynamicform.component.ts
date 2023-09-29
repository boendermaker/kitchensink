import { Component, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, FormArray, FormBuilder, FormControl, FormGroup, UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dynamicform',
  templateUrl: './dynamicform.component.html',
  styleUrls: ['./dynamicform.component.scss']
})
export class DynamicformComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    console.log();
  }

}
