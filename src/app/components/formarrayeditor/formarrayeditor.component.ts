import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import { UserFormGroup } from '@app/shared/formgroups/userformgroup.class';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { smallUID } from '@app/shared/util/smalluid';


@Component({
  selector: 'app-formarray-editor',
  standalone: true,
  imports: [
    AllAngularMaterialMDCModulesModule,
    ReactiveFormsModule
  ],
  templateUrl: './formarrayeditor.component.html',
  styleUrl: './formarrayeditor.component.scss'
})
export class DashboardPlaceholderEditorComponent implements OnInit {
  @ViewChild('formArrayTable') formArrayTable: MatTable<any[]>;

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = ['userName', 'firstName', 'lastName', 'actions'];
  parentFormGroup: FormGroup;
  parentFormArray: FormArray;
  parentFormArrayname: string;

  constructor(
    private elRef: ElementRef,
    private fb: FormBuilder,
    public controlContainer: ControlContainer
  ) {
  }

  ngOnInit(): void {
    this.init();
  }

  //###############################################################

  init(): void {
    this.parentFormGroup = (<FormGroup>this.controlContainer.control.parent);
    this.parentFormArray = (<FormArray>this.controlContainer.control);
    this.parentFormArrayname = this.elRef.nativeElement.getAttribute('formArrayName');
    this.dataSource.data = this.parentFormArray.controls;
    console.log('-------------> ', this.parentFormArrayname, this.parentFormGroup, this.parentFormArray)
  }

  //###############################################################

  addFormArrayItem(): void {
    (<FormArray>this.parentFormArray).push(
      new UserFormGroup({id: smallUID(6), userName: '', firstName: '', lastName: ''}).form
    );
    this.formArrayTable.renderRows();
  }

  //###############################################################

  removeFormArrayItem(index: number): void {
    this.parentFormArray.removeAt(index);
    this.formArrayTable.renderRows();
  }

  //###############################################################

}
