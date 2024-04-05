import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridsterdashboardComponent } from './gridsterdashboard.component';
import { DashboardComponent } from '@app/components/dashboard/dashboard.component';
import { DashboardTabsComponent } from "../../components/dashboard/dashboard-tabs/dashboard-tabs.component";
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { WidgetSelectComponent } from "../../components/dashboard/widget-select/widget-select.component";
import { WidgetContainerComponent } from '@app/components/dashboard/widget-container-custom/widget-container.component';


@NgModule({
    declarations: [
        GridsterdashboardComponent
    ],
    imports: [
        CommonModule,
        AllAngularMaterialMDCModulesModule,
        DashboardComponent,
        DashboardTabsComponent,
        WidgetSelectComponent,
        WidgetContainerComponent
    ]
})
export class GridsterdashboardModule { }
