import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { GridsterModule } from '@app/components/gridster2/gridster.module';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  exports:[
    DashboardComponent,
    GridsterModule,
  ],
  imports: [
    CommonModule,
    GridsterModule,
    AllAngularMaterialMDCModulesModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
