import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.scss'],
  standalone: false,
})
export class Form1Component {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  code: string = '';

  codeViewerControl: FormControl = new FormControl('');

  form = this.fb.group({
    chipInputTest1: this.fb.control(''),
    chipInputTest2: this.fb.control(''),
    chipFruitArrayControl: this.fb.array([])
  });

  get chipFruitArrayControl(): FormArray {
    return this.form.controls['chipFruitArrayControl'] as FormArray;
  }

  constructor(private fb: FormBuilder) {

    this.code = JSON.stringify(this.form.getRawValue(), null, 4);

    this.form.valueChanges.pipe(untilDestroyed(this)).subscribe({
      next: (state) => {
        this.code = JSON.stringify(state, null, 4);
      }
    })
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.chipFruitArrayControl.value.push(value);
    }
  }

  addCustom(value: string): void {
    if (value) {
      this.chipFruitArrayControl.value.push(value);
      this.form.updateValueAndValidity();
    }
  }

  remove(index: number): void {
    if (index >= 0) {
      this.chipFruitArrayControl.value.splice(index, 1);
      this.form.updateValueAndValidity();
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.chipFruitArrayControl.value.push(event.option.viewValue);
  }

}
