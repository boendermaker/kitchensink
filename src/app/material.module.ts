import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Material Form Controls
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
// Material Navigation
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
// Material Layout
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTreeModule } from '@angular/material/tree';
import { MatDialogModule } from '@angular/material/dialog';
// Material Buttons & Indicators
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
// Material Popups & Modals
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
// Material Data tables
import { MatSortModule } from '@angular/material/sort';
import {ScrollingModule} from '@angular/cdk/scrolling';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatStepperModule,
    MatTreeModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatIconModule,
    MatRippleModule,
    MatBottomSheetModule,
    MatSortModule,
    MatListModule,
    MatDialogModule,
    ScrollingModule,
    ReactiveFormsModule
  ],
  exports: [
    MatDatepickerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatStepperModule,
    MatTreeModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatIconModule,
    MatRippleModule,
    MatBottomSheetModule,
    MatSortModule,
    MatListModule,
    MatDialogModule,
    ScrollingModule,
    ReactiveFormsModule
  ]
})
export class MaterialModule { }
