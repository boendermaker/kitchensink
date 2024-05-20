import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { UserFormGroup } from '@app/shared/formgroups/userformgroup.class';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-tableform',
  templateUrl: './tableform.component.html',
  styleUrls: ['./tableform.component.scss']
})
export class TableformComponent {

  @ViewChild(MatTable) table: MatTable<any>;

  tableFormGroup: FormGroup;
  tableFormState: any;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = ['username', 'firstname', 'lastname', 'actions'];


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
    this.handleFormChange();
  }

  addUser(): void {
    this.userFormArray.push(new UserFormGroup({id: crypto.randomUUID()}).form);
    this.table.renderRows();
  }

  removeUser(index: number): void {
    console.log(index);
    this.userFormArray.removeAt(index);
    //this.dataSource.data = this.userFormArray.controls;
    this.table.renderRows();
  }

  handleFormChange(): void {
    this.tableFormGroup.valueChanges.pipe(untilDestroyed(this)).subscribe({
      next: (state) => {
        this.tableFormState = JSON.stringify(state, null, 4);
      }
    })
  }


}
