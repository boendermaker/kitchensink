import { FormControl, FormGroup } from "@angular/forms";
import { BaseFormGroup } from "./baseformgroup.class";

export class UserFormGroup extends BaseFormGroup {

  constructor(data: any = null) {
    super();

    data = { id: '', firstName: '', lastName: '', ...data };

    this.form = new FormGroup({
      id: new FormControl(data.id),
      firstName: new FormControl(data.firstName),
      lastName: new FormControl(data.lastName),
      userName: new FormControl(data.userName),
    });

  }

}
