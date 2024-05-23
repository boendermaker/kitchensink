import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { DashboardPlaceholderEditorComponent } from "../../components/formarrayeditor/formarrayeditor.component";
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
    selector: 'app-controlcontainer',
    standalone: true,
    templateUrl: './controlcontainer.component.html',
    styleUrl: './controlcontainer.component.scss',
    imports: [AllAngularMaterialMDCModulesModule, ReactiveFormsModule, DashboardPlaceholderEditorComponent]
})
export class ControlcontainerComponent {

  code: string = '';
  formGroup: FormGroup = new FormGroup({
    title: new FormControl(''),
    user: new FormArray([])
  });



  constructor() {
    this.code = JSON.stringify(this.formGroup.getRawValue(), null, 4);

    this.formGroup.valueChanges.pipe(untilDestroyed(this)).subscribe({
      next: (state) => {
        this.code = JSON.stringify(state, null, 4);
      }
    })
  }


}
