import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeviewComponent } from './treeview.component';
import { MultidimensionalViewModule } from "../../components/multidimensional-view/multidimensional-view.module";



@NgModule({
    declarations: [
        TreeviewComponent
    ],
    imports: [
        CommonModule,
        MultidimensionalViewModule
    ]
})
export class TreeviewModule { }
