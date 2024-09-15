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
        BA: '',
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

    const getPaths = (item) => {
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

    const fullPaths = (paths: any[]) => {
      const fullPaths = [];

      paths.forEach((path) => {
        let temp = '';
        let count = 0;

        for(let i=0; i<path.length; i++) {
          for(let c=i; c<i+1; c++) {
            temp += path[c] + '.';
          }
          count++;
          fullPaths.push(temp);
        }
        console.log(temp)
      })


      return fullPaths

    }

    console.log('FULL ', fullPaths(getPaths(this.formModel)));

    const loop = (obj, currentKey, level) => {

      level = level || '';

      for(const key in obj) {

        if(Object.keys(obj[key]).length) {
          console.log(level, key, 'haschilds')
        }else {
          console.log(level, key, 'nochilds')
        }

        if(typeof obj[key] === 'object') {

          if(Array.isArray(obj[key])) {
            obj[key].forEach(arrayItem => loop(arrayItem, key, level + '.'))
          }else {
            loop(obj[key], key, level + '.');
          }

        }else {

        }


      }

    }


    const paths = getPaths(this.formModel);
    console.log('PATHS ', paths);

    paths.forEach((path) => {
      const currentPath = [];
      path.forEach((pathItem) => {

      })
    })


    console.log(_.flatten(this.formModel))

  }


}
