import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, startWith, map } from 'rxjs';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-chiplist',
  templateUrl: './chiplist.component.html',
  styleUrls: ['./chiplist.component.scss']
})
export class ChiplistComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  code: string = '';

  codeViewerControl: FormControl = new FormControl('');

  form1 = this.fb.group({
    chipInputTest1: this.fb.control(''),
    chipInputTest2: this.fb.control(''),
    chipFruitArrayControl: this.fb.array([])
  });

  get chipFruitArrayControl(): FormArray {
    return this.form1.controls['chipFruitArrayControl'] as FormArray;
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form1.valueChanges.pipe(untilDestroyed(this)).subscribe({
      next: (state) => {
        this.codeViewerControl.patchValue(JSON.stringify(state));

      }
    })
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    console.log('VALUE ', value);
    // Add our fruit
    if (value) {
      this.chipFruitArrayControl.value.push(value);
    }
  }

  addCustom(value: string): void {
    if (value) {
      this.chipFruitArrayControl.value.push(value);
      this.form1.updateValueAndValidity();
    }
  }

  remove(index: number): void {
    if (index >= 0) {
      this.chipFruitArrayControl.value.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.chipFruitArrayControl.value.push(event.option.viewValue);
  }

  updateJSONview(): void {

  }

}
