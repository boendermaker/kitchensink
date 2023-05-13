import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavModule } from "./components/sidenav/sidenav.module";
import { ViewsModule } from './views.module';
import { ComponentsModule } from './components.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    exports: [
        MaterialModule
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MaterialModule,
        SidenavModule,
        ViewsModule,
        ComponentsModule
    ]
})
export class AppModule { }
