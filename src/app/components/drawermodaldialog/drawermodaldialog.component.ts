import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-drawermodaldialog',
  templateUrl: './drawermodaldialog.component.html',
  styleUrls: ['./drawermodaldialog.component.scss']
})
export class DrawermodaldialogComponent {

  slideoutMode: 'side'|'over'|'push' = 'side';
  slideoutState: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<DrawermodaldialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  }


}
