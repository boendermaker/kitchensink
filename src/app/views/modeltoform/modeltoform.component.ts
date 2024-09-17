import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';


@Component({
  selector: 'app-modeltoform',
  standalone: true,
  imports: [ReactiveFormsModule, AllAngularMaterialMDCModulesModule],
  templateUrl: './modeltoform.component.html',
  styleUrl: './modeltoform.component.scss'
})
export class ModelToFormComponent implements AfterViewInit {

  formGroup: FormGroup = new FormGroup({})
  formModel = {};

  constructor(private cdr: ChangeDetectorRef, private fb: FormBuilder) {

    this.formModel = {
      A: {
        AB: ''
      },
      B: {
        BA: [
          {x: '', y: '', z: ''},
          {x: '', y: '', z: ''},
        ],
        BB: {
          BBA: {
            BBAA: '',
            BBAB: ''
          }
        }
      }
    }

    this.buildFormGroup(this.formModel, this.formGroup);

  }

  ngAfterViewInit(): void {
    console.log('PARENTFORMGROP ', this.formGroup, this.formGroup.getRawValue());
  }

//##########################################################

  createForm(data: any): FormGroup {
    const group = new FormGroup({});
    
    for(let key in data) {
      if(Array.isArray(data[key])) {

        group.addControl(key, new FormArray([this.createForm(data[key][0])]));
        
        for(let i=1; i<data[key].length; i++) {
          (<FormArray>group.get(key)).push(this.createForm(data[key][i]));
        }

      }else {
        
        if(typeof data[key] === 'object') {
          group.addControl(key, this.createForm(data[key]));
        }else {
          group.addControl(key, new FormControl(data[key]));
        }

      }
    }

    return group;
  }

//##########################################################

  buildFormGroup<FORMMODELTYPE>(formModel: FORMMODELTYPE, formGroup: FormGroup) {

    console.log('CREATEDFORM ', this.createForm(this.formModel));

  }


}
