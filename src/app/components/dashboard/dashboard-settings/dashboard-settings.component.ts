import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { DashboardService } from '../dashboard-service/dashboard.service';
import { IDashboard } from '../dashboard.interface';

@Component({
  selector: 'app-dashboard-settings',
  standalone: true,
  imports: [AllAngularMaterialMDCModulesModule, ReactiveFormsModule],
  templateUrl: './dashboard-settings.component.html',
  styleUrl: './dashboard-settings.component.scss'
})
export class DashboardSettingsComponent implements OnInit {

  dashboardService: DashboardService;
  dashboard: IDashboard;
  formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DashboardSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.dashboardService = this.data.dashboardService;
  }

  ngOnInit(): void {
    this.createFormGroup();
    this.getRenderedDashboard();
    this.setFormGroup();
  }

//##################################################################

  getRenderedDashboard(): void {
    this.dashboard = this.dashboardService.dashboardUtils.getRendered();
  }

//##################################################################

  createFormGroup(): void {
    this.formGroup = this.fb.group({
      label: this.fb.control('')
    })
  }

//##################################################################

  setFormGroup(): void {
    this.formGroup.patchValue({
      label: this.dashboard.label
    })
  }

//##################################################################

  updateDashboard(): void {
    const changedDashboard: IDashboard = this.dashboardService.dashboardUtils.getRendered();
    changedDashboard.label = this.formGroup.get('label').value;

    this.dashboardService.dashboardUtils.updateDashboard(changedDashboard);
    this.closeModalDialog();
  }

//##################################################################

  closeModalDialog(): void {
    this.dialogRef.close();
  }

//##################################################################

}
