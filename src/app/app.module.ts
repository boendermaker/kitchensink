import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AllAngularMaterialMDCModulesModule } from './shared/modules/allmaterial/allmaterial.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavModule } from "./components/sidenav/sidenav.module";
import { ViewsModule } from './views/views.module';
import { ComponentsModule } from './components/components.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    exports: [
        AllAngularMaterialMDCModulesModule
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        AllAngularMaterialMDCModulesModule,
        SidenavModule,
        ViewsModule,
        ComponentsModule
    ]
})
export class AppModule { }
