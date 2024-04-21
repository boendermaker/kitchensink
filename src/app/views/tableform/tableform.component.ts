import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

interface IUser {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
}

@Component({
  selector: 'app-tableform',
  templateUrl: './tableform.component.html',
  styleUrls: ['./tableform.component.scss']
})
export class TableformComponent {

  tableFormGroup: FormGroup;
  user: IUser[] = [];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['username', 'firstname', 'lastname'];

  get userFormArray(): FormArray {
    return this.tableFormGroup.get('users') as FormArray;
  }


  constructor(private fb: FormBuilder) {
    this.tableFormGroup = this.fb.group({
      users: this.fb.array([])
    });
  }

  ngOnInit(): void {

  }

}
