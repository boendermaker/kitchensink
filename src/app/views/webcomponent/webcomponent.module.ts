import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebcomponentComponent } from './webcomponent.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AllAngularMaterialMDCModulesModule } from '../../shared/modules/allmaterial/allmaterial.module';
import { ReactiveFormsModule } from '@angular/forms';
import '../../../../node_modules/webcomponents/public/countbutton/';
import '../../../../node_modules/webcomponents/public/datatest/';
import '../../../../node_modules/webcomponents/public/threetest/';


@NgModule({ schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        WebcomponentComponent
    ], imports: [CommonModule,
        ReactiveFormsModule,
        AllAngularMaterialMDCModulesModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class WebcomponentModule { }
