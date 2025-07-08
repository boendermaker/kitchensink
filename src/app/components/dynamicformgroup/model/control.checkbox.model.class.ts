import { AbstractControl, FormControl } from "@angular/forms";
import { ControlBaseModel } from "./control.base.model.class";

type TCheckboxOptions = {value: string};
type TCheckboxAttributes = {label: string, selected: boolean};

export class ControlCheckboxModel extends ControlBaseModel {

    options: TCheckboxOptions;
    attributes?: TCheckboxAttributes;

    constructor(
        name: string, 
        instance: FormControl, 
        options: TCheckboxOptions, 
        attributes?: TCheckboxAttributes,
        order?: number
    ) {
        super(name, instance, options, attributes, order);
        this.type = 'checkbox';
        this.options = options;
        this.attributes = attributes;
    }

}