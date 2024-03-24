import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { GridsterModule } from '@app/components/gridster2/gridster.module';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { ReactiveFormsModule } from '@angular/forms';
import { WidgetcontainerComponent } from "./widget-container/widget-container.component";
import { WidgetSelectComponent } from "./widget-select/widget-select.component";


@NgModule({
    declarations: [
        DashboardComponent
    ],
    exports: [
        DashboardComponent,
        GridsterModule,
        WidgetSelectComponent
    ],
    imports: [
        CommonModule,
        GridsterModule,
        AllAngularMaterialMDCModulesModule,
        ReactiveFormsModule,
        WidgetcontainerComponent,
        WidgetSelectComponent
    ]
})
export class DashboardModule { }
