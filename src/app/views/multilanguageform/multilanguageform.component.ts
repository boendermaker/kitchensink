import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';

export class MessageModel {
  title: FormControl;
  message: FormControl;

  constructor(title?: string, description?: string) { 
    this.title = new FormControl(title);
    this.message = new FormControl(description);
  }

  form() {
    return new FormGroup({
      title: this.title,
      message: this.message
    });
  }
}

@Component({
  selector: 'app-multilanguageform',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, AllAngularMaterialMDCModulesModule],
  templateUrl: './multilanguageform.component.html',
  styleUrl: './multilanguageform.component.scss'
})
export class MultilanguageformComponent {

  fb: FormBuilder = new FormBuilder();

  multiLanguageFormGroup = new FormGroup({
    id: new FormControl(''),
    messages: new FormGroup({
      'de-DE': new MessageModel('Titel', 'Nachricht').form(),
      'en-GB': new MessageModel('Title', 'Message').form(),
      'fr-FR': new MessageModel('Soup', 'Du Jour').form(),
    })
  })

  constructor() {
    console.log(this.multiLanguageFormGroup);
  }

}
