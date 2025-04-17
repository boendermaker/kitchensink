import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-drawermodaldialog',
  templateUrl: './drawermodaldialog.component.html',
  styleUrls: ['./drawermodaldialog.component.scss'],
  standalone: false,
})
export class DrawermodaldialogComponent {

  slideoutMode: 'side'|'over'|'push' = 'side';
  slideoutState: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DrawermodaldialogComponent>,
  ) {

  }


}
