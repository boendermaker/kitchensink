import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
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
