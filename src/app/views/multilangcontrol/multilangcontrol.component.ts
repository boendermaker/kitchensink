import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { MultilanginputComponent } from "../../components/multilanginput/multilanginput.component";
import { AsyncValidatorFn, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import * as _ from 'lodash';


@Component({
  selector: 'app-multilangcontrol',
  standalone: true,
  imports: [MultilanginputComponent, ReactiveFormsModule, AllAngularMaterialMDCModulesModule],
  templateUrl: './multilangcontrol.component.html',
  styleUrl: './multilangcontrol.component.scss'
})
export class MultilangControlComponent implements AfterViewInit {

  formGroup: FormGroup = new FormGroup({})
  formModel = {};
  formModel2 = {};

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


  buildFormGroup<FORMMODELTYPE>(formModel: FORMMODELTYPE, formGroup: FormGroup) {

    const getPaths = (item: {[p: string]: string}) => {
      const iter = (r, p) => {
        const keys = Object.keys(r);
        if (keys.length) {
          return keys.forEach(x => iter(r[x], p.concat(x)));
        }
        result.push(p);
      }
      const result = [];
      iter(item, []);
      return result;
    }

    const fullPaths = (paths: string[]) => {
      const fullPaths = [];

      paths.forEach((path) => {
        let temp = '';

        for(let i=0; i<path.length; i++) {
          for(let c=i; c<i+1; c++) {
            temp += path[c] + '.';
          }
          fullPaths.push(temp.slice(0, -1));
        }
      })
      return fullPaths
    }

    console.log('FULL ', fullPaths(getPaths(this.formModel)));

  }


}
