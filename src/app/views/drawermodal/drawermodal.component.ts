import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DrawermodaldialogComponent} from '../../components/drawermodaldialog/drawermodaldialog.component';

@Component({
  selector: 'app-drawermodal',
  templateUrl: './drawermodal.component.html',
  styleUrls: ['./drawermodal.component.scss'],
  standalone: false,
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
      width: '90vw',
      height: '90vh',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

}
