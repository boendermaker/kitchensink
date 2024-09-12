import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { MultilanginputComponent } from "../../components/multilanginput/multilanginput.component";
import { AsyncValidatorFn, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';


@Component({
  selector: 'app-multilangcontrol',
  standalone: true,
  imports: [MultilanginputComponent, ReactiveFormsModule, AllAngularMaterialMDCModulesModule],
  templateUrl: './multilangcontrol.component.html',
  styleUrl: './multilangcontrol.component.scss'
})
export class MultilangControlComponent implements AfterViewInit {
  
  formGroup: FormGroup = new FormGroup({
    translatable: new FormControl(''),
  })

  constructor(private cdr: ChangeDetectorRef, private fb: FormBuilder) {
    const data = {
      email: 'test@email.com',
      password: 'test-password',
      address: [
        {
          street: 'Street 1',
          postCode: 1000
        },
        {
          street: null,
          postCode: null
        }
      ]
    };

    const validationSchema = {
      email: [[Validators.required, Validators.email]],
      password: [[Validators.required, Validators.minLength(6)]],
      address: [
        {
          street: [[Validators.required]],
          postCode: [[Validators.required]]
        },
        {
          street: [[Validators.required]],
          postCode: [[Validators.required]]
        }
      ]
    };

    this.formGroup = this.parseData(data, validationSchema) as FormGroup;
    
  }

  ngAfterViewInit(): void {   

    console.log('PARENTFORMGROP ', this.formGroup, this.formGroup.getRawValue());

  }
 

    parseData(data: any, validators?: any): FormGroup | FormArray | [any, ValidatorFn[], AsyncValidatorFn[]] {
      if (Array.isArray(data)) {
        return this.fb.array(data.map((item, index) => this.parseData(item, (validators || {})[index])));
      }
      if (typeof data === 'object' && data !== null) {
        const formGroupContent = {};
        for (const [key, value] of Object.entries(data)) {
          formGroupContent[key] = this.parseData(value, (validators || {})[key]);
        }
        return this.fb.group(formGroupContent);
      }
      const [syncValidators = [], asyncValidators = []] = validators || [];
      return [data, syncValidators, asyncValidators];
    }

}
