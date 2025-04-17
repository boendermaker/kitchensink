import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormGroup, FormControl, FormArray, FormBuilder, AbstractControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.scss'],
  standalone: false,
})
export class Form2Component {

  fruits: any[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  code: string = '';
  form: FormGroup;
  controls = {
    chipInputTest1: new FormControl(''),
    chipInputTest2: new FormControl(''),
    chipFruitArrayControl: new FormArray(this.fruits) 
  }
  
  constructor(private fb: FormBuilder) {
   
    this.setupForm();

    this.code = JSON.stringify(this.form.getRawValue(), null, 4);

    this.form.valueChanges.pipe(untilDestroyed(this)).subscribe({
      next: (state) => {
        this.code = JSON.stringify(state, null, 4);
      }
    })
  }

  setupForm(): void {
    this.form = new FormGroup(this.controls);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.fruits.push(value);
    }
  }

  addCustom(value: string): void {
    if (value) {
      this.fruits.push(value);
      (<FormArray>this.form.controls['chipFruitArrayControl']).value.push({
        id: 12345, value: value
      });
      this.form.updateValueAndValidity();
    }
  }

  remove(index: number): void {
    if (index >= 0) {
      this.fruits.splice(index, 1);
      (<FormArray>this.form.controls['chipFruitArrayControl']).value.splice(index,1);
      this.form.updateValueAndValidity();
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    
  }

  randomText(): string {

      const randomLengthRange = (min, max) => {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min + 1) + min);
      }

      const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz'.split('');

      const length = randomLengthRange(3,10);

      let str = '';
      for (var i = 0; i < length; i++) {
          str += chars[Math.floor(Math.random() * chars.length)];
      }
      return str;
  }

}
