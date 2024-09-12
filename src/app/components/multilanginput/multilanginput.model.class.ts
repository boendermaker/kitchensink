import { FormArray, FormControl, FormGroup } from "@angular/forms"

enum AvailableLanguages {
  'de-DE' = 'de-DE',
  'en-GB' = 'en-GB',
  'fr-FR' = 'fr-FR',
  'es-ES' = 'es-ES',
}

export class MultiLangFormGroupModel {
  form: FormGroup;

  constructor(data: any = null) {
    if(!data) {
      this.form = new FormGroup(this.getLocaleControls());
    }
  }

  getLocaleControls() {
    const obj = {};
    Object.values(AvailableLanguages).forEach(locale => obj[locale] = new FormControl(''));
    return obj;
  }

  get value() {
    return this.form.value;
  }

  get controls() {
    return this.form.controls;
  }

  get(path: string): FormControl | FormArray {
    const formItem = this.form.get(path);

    if(formItem instanceof FormControl) {
      return this.form.get(path) as FormControl;
    }

    if(formItem instanceof FormArray) {
      return this.form.get(path) as FormArray;
    }
  }

  setValue(path:string, value:any) {
    this.form.get(path).setValue(value);
  }
}