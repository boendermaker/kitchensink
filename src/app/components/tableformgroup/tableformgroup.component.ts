import { Component, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, FormBuilder, UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tableform',
  templateUrl: './tableformgroup.component.html',
  styleUrls: ['./tableformgroup.component.scss']
})
export class TableformgroupComponent implements OnInit {

  dataSource: MatTableDataSource<AbstractControl>;
  formArrayName: string = 'signals';
  form: UntypedFormGroup;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  get dynamicFormGorup() {
    return this.form.controls[this.formArrayName] as UntypedFormArray;
  }

  constructor(
    private controlContainer: ControlContainer,
    private fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.form = <UntypedFormGroup>this.controlContainer.control;
    this.form.addControl(this.formArrayName, this.fb.array([]));
    this.dataSource = new MatTableDataSource((this.form.get(this.formArrayName) as UntypedFormArray).controls);
  }



  addRow(): void {

  }

  removeRow(): void {

  }

}
