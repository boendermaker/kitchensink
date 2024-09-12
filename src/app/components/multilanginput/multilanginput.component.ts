import { Component, ElementRef, Input } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ControlContainer, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { MultiLangFormGroupModel } from './multilanginput.model.class';

@Component({
  selector: 'app-multilanginput',
  standalone: true,
  imports: [AllAngularMaterialMDCModulesModule, ReactiveFormsModule],
  templateUrl: './multilanginput.component.html',
  styleUrl: './multilanginput.component.scss'
})
export class MultilanginputComponent {

  @Input() controls: unknown[];

  parentFormGroup: FormGroup;

  constructor(
    private elRef: ElementRef,
    private fb: FormBuilder,
    public controlContainer: ControlContainer
  ) {

  }

  ngOnInit(): void {
    this.init();
  }

  //################################################

  init(): void {
    this.parentFormGroup = (<FormGroup>this.controlContainer.control);
  }

  //################################################



  //################################################


}
