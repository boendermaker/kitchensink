import { Component, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, FormArray, FormBuilder, FormControl, FormGroup, UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dynamicform',
  templateUrl: './dynamicform.component.html',
  styleUrls: ['./dynamicform.component.scss']
})
export class DynamicformComponent implements OnInit {

  dataSource: MatTableDataSource<AbstractControl>;
  formArrayName: string = 'signals';
  form: UntypedFormGroup;

  constructor(
    private controlContainer: ControlContainer,
    private fb: FormBuilder
    ) {
  }

  ngOnInit(): void {
    console.log();
  }

  initData(): void {
    this.form = <UntypedFormGroup>this.controlContainer.control;
    this.form.addControl(this.formArrayName, this.fb.array([]));
    this.dataSource = new MatTableDataSource((this.form.get(this.formArrayName) as UntypedFormArray).controls);
  }

}
