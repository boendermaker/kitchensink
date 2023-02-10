import {Component, Inject} from '@angular/core';
import {MatLegacyDialog as MatDialog, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef} from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-drawermodaldialog',
  templateUrl: './drawermodaldialog.component.html',
  styleUrls: ['./drawermodaldialog.component.scss']
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
