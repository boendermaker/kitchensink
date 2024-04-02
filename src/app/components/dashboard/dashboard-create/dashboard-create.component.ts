import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { DashboardService } from '../dashboard-service/dashboard.service';

@Component({
  selector: 'app-dashboard-settings',
  standalone: true,
  imports: [AllAngularMaterialMDCModulesModule, ReactiveFormsModule],
  templateUrl: './dashboard-create.component.html',
  styleUrl: './dashboard-create.component.scss'
})
export class DashboardCreateComponent implements OnInit {

  dashboardService: DashboardService;
  formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DashboardCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.dashboardService = this.data.dashboardService;
  }

  ngOnInit(): void {
    this.createFormGroup();
  }

//##################################################################

  createFormGroup(): void {
    this.formGroup = this.fb.group({
      label: this.fb.control('New dashboard')
    })
  }

//##################################################################

  createDashboard(): void {
    const label: string = this.formGroup.get('label').value !== '' ? this.formGroup.get('label').value : 'Empty dashboard';
    this.dashboardService.dashboardUtils.add(label);
    this.closeModalDialog();
  }

//##################################################################

  closeModalDialog(): void {
    this.dialogRef.close();
  }

//##################################################################

}
