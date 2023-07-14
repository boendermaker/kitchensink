import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamicform',
  templateUrl: './dynamicform.component.html',
  styleUrls: ['./dynamicform.component.scss']
})
export class DynamicformComponent implements OnInit {

  testControl: FormControl = new FormControl();

  signals: any[] = [
    {id: '2j3h4lk23jhlk2j35hl2', label: 'signalA', value: 50},
    {id: 'nkl32j4ntkl3j4ntklj4', label: 'signalB', value: 100},
    {id: 'knlwelfjnwkldcnwklje', label: 'signalC', value: 150}
  ]

  constructor(private fb: FormBuilder) {
  }

  newFormGroupSignals() {
    return this.fb.group({
      signals: this.fb.array(this.getSignalsFormGroup())
    })
  }

  getSignalsFormGroup(): FormControl[] {
    const controls: FormControl[] = [];
    for(const field of this.signals) {
      controls.push(new FormControl(field.value));
    }
    return controls;
  }

  ngOnInit(): void {
    const formGroups: FormArray[] = [];

    const tester: FormGroup = this.fb.group(formGroups);

    console.log(tester)

    tester.valueChanges.subscribe((value) => {
      console.log(value)
    })


  }


}
