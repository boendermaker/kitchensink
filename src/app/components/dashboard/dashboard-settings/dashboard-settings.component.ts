import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { DashboardService } from '../dashboard-service/dashboard.service';

@Component({
  selector: 'app-dashboard-settings',
  standalone: true,
  imports: [AllAngularMaterialMDCModulesModule, ReactiveFormsModule],
  templateUrl: './dashboard-settings.component.html',
  styleUrl: './dashboard-settings.component.scss'
})
export class DashboardSettingsComponent implements OnInit {

  dashboardService: DashboardService;
  formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DashboardSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.dashboardService = this.data.dashboardService;
  }

//##################################################################

  ngOnInit(): void {

  }

//##################################################################

  getRenderedDashboard(): void {

  }

//##################################################################

}
