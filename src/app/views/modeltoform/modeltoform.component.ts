import { AfterViewInit, ChangeDetectorRef, Component, signal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';

class formModel {
  public A;
  public B;

  constructor() {
    this.A = new AA();
    this.B = new BA();
  }
}

class AA {
  public AB: AAA;
  constructor() {
    this.AB = new AAA();
  }
}

class AAA {
  public AAA;
  constructor() {
    this.AAA = [];
  }
}

class BA {
  public x: string;
  public y: string;
  public z: string;
  constructor() {
    this.x = '';
    this.y = '';
    this.z = '';
  }
}

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

    this.formModel = new formModel();

    this.buildFormGroup(this.formModel, this.formGroup);

  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

//##########################################################

  createForm(data: any): FormGroup {
    const group = new FormGroup({});

    for(let key in data) {
      if(Array.isArray(data[key])) {

        if(data[key].length > 0) {
          group.addControl(key, new FormArray([this.createForm(data[key][0])]));

          for(let i=1; i<data[key].length; i++) {
            (<FormArray>group.get(key)).push(this.createForm(data[key][i]));
          }
        }else {
          group.addControl(key, new FormArray([]));
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
    console.log('MODEL ', this.formModel);
    console.log('CREATEDFORM ', this.createForm(this.formModel));
  }

//##########################################################

}
