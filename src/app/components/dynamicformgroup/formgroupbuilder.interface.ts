import { AbstractControl } from "@angular/forms";
import { ControlTextModel } from "./model/control.text.model.class";
import { ControlSelectModel } from "./model/control.select.model.class";
import { ControlCheckboxModel } from "./model/control.checkbox.model.class";
import { ControlRadioModel } from "./model/control.radio.model.class";

export type TFormGroupBuilderControl = ControlTextModel & ControlSelectModel & ControlCheckboxModel & ControlRadioModel;