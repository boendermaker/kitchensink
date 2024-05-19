import { FormArray, FormControl, FormGroup } from "@angular/forms"

export class BaseFormGroup {
  form: FormGroup;

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
