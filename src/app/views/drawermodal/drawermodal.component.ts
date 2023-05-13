import { Component, OnInit, Inject } from '@angular/core';
import {MatLegacyDialog as MatDialog, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef} from '@angular/material/legacy-dialog';
import {DrawermodaldialogComponent} from '../../components/drawermodaldialog/drawermodaldialog.component';

@Component({
  selector: 'app-drawermodal',
  templateUrl: './drawermodal.component.html',
  styleUrls: ['./drawermodal.component.scss']
})
export class DrawermodalComponent implements OnInit {

  constructor(
    public modalDialog: MatDialog
    ) {

  }

  ngOnInit(): void {

  }

  openModal(): void {
    const dialogRef = this.modalDialog.open(DrawermodaldialogComponent, {
      width: '100%',
      height: '90%',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
