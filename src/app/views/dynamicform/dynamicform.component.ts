import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import { TFormGroupBuilderControl} from '@app/components/dynamicformgroup/formgroupbuilder.interface';
import { ControlCheckboxModel } from '@app/components/dynamicformgroup/model/control.checkbox.model.class';
import { ControlRadioModel } from '@app/components/dynamicformgroup/model/control.radio.model.class';
import { ControlSelectModel } from '@app/components/dynamicformgroup/model/control.select.model.class';
import { ControlTextModel } from '@app/components/dynamicformgroup/model/control.text.model.class';

@Component({
  selector: 'app-dynamicform',
  templateUrl: './dynamicform.component.html',
  styleUrls: ['./dynamicform.component.scss'],
  standalone: false,
})
export class DynamicformComponent implements OnInit {

  destroyRef = inject(DestroyRef);

  form: FormGroup = new FormGroup({});

  testControls: TFormGroupBuilderControl[] = [

    <TFormGroupBuilderControl>new ControlTextModel(
      'Testinput',
      new FormControl(''),
      {value: 'Lorem'},
      {label: 'Vorname'},
      0
    ),
    <TFormGroupBuilderControl>new ControlSelectModel(
      'TestSelect',
      new FormControl(''),
      [{label: 'Selectitem1', value: 0}, {label: 'Selectitem2', value: 1}],
      {label: 'Vorname', selected: 1},
      1
    ),
    <TFormGroupBuilderControl>new ControlCheckboxModel(
      'TestCheckbox',
      new FormControl(''),
      {value: 'Lorem'},
      {label: 'Vorname', selected: false},
      2
    ),
    <TFormGroupBuilderControl>new ControlRadioModel(
      'TestRadio',
      new FormControl(''),
      [{label: 'TestRadio1', value: 0}, {label: 'TestRadio2', value: 1}],
      {label: 'Vorname', selected: 0},
      3
    ),

  ]

  constructor() {
    this.form
    this.handleFormChange();
  }

  ngOnInit(): void {
    this.testControls.forEach((control) => {
      this.form.addControl(control.name, control.instance);
    })
  }

  handleFormChange(): void {
    this.form.valueChanges
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (value) => {
        console.log('Form value changed:', value);
      },
      error: (error) => {
        console.error('Error in form value changes:', error);
      }
    })
  }

}
