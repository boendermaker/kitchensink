import { AbstractControl } from "@angular/forms";

export interface IDynamicFormGroup extends Array<IDynamicFormControl> {
}

export interface IDynamicFormControl {
  controlType: 'text'|'password'|'select'|'checkbox'|'radio';
  controlInstance: AbstractControl<any|any>;
  controlLabel: string;
  controlValue: string|number|boolean|(string|number|boolean)[];
}
