import { AbstractControl, Validators } from "@angular/forms";

export interface IDynamicFormGroup extends Array<IDynamicFormControl> {
}

export interface IDynamicFormControl {
  name: string;
  type: 'text'|'password'|'select'|'checkbox'|'radio';
  value: any;
  instance?: AbstractControl<any|any>;
  attributes?: {[key: string]: any};
  order?: number;
}

export interface IDynamicFormControlText extends IDynamicFormControl {
  value: string;
}

export interface IDynamicFormControlSelect extends IDynamicFormControl {
  value: { label: string; value: any; }[];
}