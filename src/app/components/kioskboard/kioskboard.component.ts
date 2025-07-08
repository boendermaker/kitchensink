import { Component, Inject, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl } from '@angular/forms';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { KioskboardService } from './kioskboard.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-kioskboard',
  standalone: true,
  imports: [CommonModule, AllAngularMaterialMDCModulesModule],
  templateUrl: './kioskboard.component.html',
  styleUrls: ['./kioskboard.component.scss']
})
export class KioskboardComponent {

  kioskboardService = inject(KioskboardService);

  constructor(
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public data: {formControl: AbstractControl<any,any>}
  ) {

  }

  setValue(value: number|string): void {
    let newValue = '';
    let currentValue = this.data.formControl.value;
    
    if(value === 'backspace') {
      newValue = currentValue.substring(0, currentValue.length-1);
    }else {
      newValue = currentValue + value;
    }
    
    this.data.formControl.patchValue(newValue);
  }

}
