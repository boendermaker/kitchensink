import { AbstractControl } from "@angular/forms";

export interface IFormGroupBuilder extends Array<IFormGroupBuilderControl> {
}

export interface IFormGroupBuilderControl {
  name: string;
  type: 'text'|'password'|'select'|'checkbox'|'radio';
  value: any;
  instance?: AbstractControl<any|any>;
  attributes?: {[key: string]: any};
  order?: number;
}

export interface IFormGroupBuilderControlText extends IFormGroupBuilderControl {
  value: string;
  attributes: {label: string};
}

export interface IFormGroupBuilderControlPassword extends IFormGroupBuilderControl {
  value: string;
  attributes: {label: string};
}

export interface IFormGroupBuilderControlSelect extends IFormGroupBuilderControl {
  value: { label: string; value: any; }[];
  attributes: {label: string; selected: any};
}

export interface IFormGroupBuilderControlCheckbox extends IFormGroupBuilderControl {
  value: any;
  attributes: {label: string; selected: boolean};
}

export interface IFormGroupBuilderControlRadio extends IFormGroupBuilderControl {
  value: { label: string; value: any; }[];
  attributes: {label: string; selected: any};
}