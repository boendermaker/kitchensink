import { ChangeDetectorRef, Component, Inject, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DashboardService } from '@app/components/dashboard/dashboard-service/dashboard.service';
import { IDashboardWidget } from '@app/components/dashboard/dashboard.interface';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { untilDestroyed } from '@ngneat/until-destroy';

export let AppInjector: Injector;

@Component({
  selector: 'app-widget-settings',
  standalone: true,
  imports: [AllAngularMaterialMDCModulesModule, ReactiveFormsModule],
  templateUrl: './widget-settings.component.html',
  styleUrl: './widget-settings.component.scss'
})
export class WidgetLinechartSettingsComponent implements OnInit {

  widgetId: string;
  widget: IDashboardWidget;
  formGroup: FormGroup;
  dashboardService: DashboardService;

  constructor(
    public dialogRef: MatDialogRef<WidgetLinechartSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.dashboardService = this.data.dashboardService;
    this.setWidgetId();
    this.setWidget();
    this.createFormGroup();
    this.restoreSettings();
  }

  //##################################################################

  setWidgetId(): void {
    this.widgetId = this.data.widgetId;
  }

  //##################################################################

  setWidget(): void {
    this.widget = this.dashboardService.widgetUtils.getById(this.widgetId);
  }

  //##################################################################

  createFormGroup(): void {
    this.formGroup = this.fb.group({
      label: this.fb.control(''),
      color: this.fb.control('')
    })
  }

  //##################################################################

  restoreSettings(): void {
    this.formGroup.setValue(this.widget.contentSettings);
  }

  //##################################################################

  saveSettings(): void {
    const formState = this.formGroup.getRawValue();
    this.dashboardService.widgetUtils.setContentSettings(this.widgetId, formState);
    this.dialogRef.close();
  }

  //##################################################################

}
