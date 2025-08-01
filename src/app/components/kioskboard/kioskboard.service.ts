import { ElementRef, Injectable } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { KioskboardComponent } from './kioskboard.component';
import { Dialog } from '@angular/cdk/dialog';
import { ConnectedPosition, FlexibleConnectedPositionStrategy, Overlay, PositionStrategy } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class KioskboardService {

  constructor(
    public overlay: Overlay,
    public dialog: Dialog
  ) { }

  openKioskboardDialog(formControl: AbstractControl<any, any>, event: MouseEvent): void {

    const clickTargetEl = event.target as HTMLElement;

    this.dialog.closeAll();

    this.dialog.open<any>(KioskboardComponent, {
      width: '320px',
      hasBackdrop: false,
      positionStrategy: this.overlay.position().flexibleConnectedTo(clickTargetEl).withPositions(<ConnectedPosition[]>[{
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top'
    }]),
      data: {formControl: formControl}
    });

  }

  closeKioskboardDialog(): void {
    this.dialog.closeAll();
  }

}
