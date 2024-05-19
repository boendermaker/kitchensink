import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { UserFormGroup } from '@app/shared/formgroups/userformgroup.class';


@Component({
  selector: 'app-tableform',
  templateUrl: './tableform.component.html',
  styleUrls: ['./tableform.component.scss']
})
export class TableformComponent {

  @ViewChild(MatTable) table: MatTable<any>;

  tableFormGroup: FormGroup;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = ['username', 'firstname', 'lastname'];


  get userFormArray(): FormArray {
    return this.tableFormGroup.get('users') as FormArray;
  }


  constructor(private fb: FormBuilder) {
    this.tableFormGroup = this.fb.group({
      users: this.fb.array([])
    });
    this.dataSource.data = this.userFormArray.controls;
  }

  ngOnInit(): void {
    console.log()
  }

  addUser(): void {
    this.userFormArray.push(new UserFormGroup().form);
    this.table.renderRows();
  }



}
