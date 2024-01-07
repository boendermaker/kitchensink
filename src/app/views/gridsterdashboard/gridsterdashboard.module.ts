import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridsterdashboardComponent } from './gridsterdashboard.component';
import { DashboardModule } from '@app/components/dashboard/dashboard.module';
import { DashboardTabsComponent } from "../../components/dashboard/dashboard-tabs/dashboard-tabs.component";
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';



@NgModule({
    declarations: [
        GridsterdashboardComponent
    ],
    imports: [
        CommonModule,
        DashboardModule,
        AllAngularMaterialMDCModulesModule,
        DashboardTabsComponent
    ]
})
export class GridsterdashboardModule { }
