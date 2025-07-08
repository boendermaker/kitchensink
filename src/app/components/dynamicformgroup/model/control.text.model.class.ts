import { AbstractControl, FormArray, FormControl } from "@angular/forms";
import { ControlBaseModel } from "./control.base.model.class";

type TTextOptions = { value: string|number};
type TTextAttributes = { label: string };

export class ControlTextModel extends ControlBaseModel {

    options: TTextOptions;
    attributes: TTextAttributes;

    constructor(
        name: string, 
        instance: FormControl<any|any>, 
        options: TTextOptions,
        attributes: TTextAttributes,
        order?: number
    ) {
        super(name, instance, options, attributes, order);
        this.type = 'text';
        this.attributes = attributes;
    }

}