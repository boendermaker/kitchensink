import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridsterdashboardComponent } from './gridsterdashboard.component';
import { DashboardModule } from '@app/components/dashboard/dashboard.module';
import { DashboardTabsComponent } from "../../components/dashboard/dashboard-tabs/dashboard-tabs.component";



@NgModule({
    declarations: [
        GridsterdashboardComponent
    ],
    imports: [
        CommonModule,
        DashboardModule,
        DashboardTabsComponent
    ]
})
export class GridsterdashboardModule { }
