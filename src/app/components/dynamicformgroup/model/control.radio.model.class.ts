import { AbstractControl } from "@angular/forms";
import { IFormGroupBuilderControl, IFormGroupBuilderControlCheckbox, IFormGroupBuilderControlSelect, IFormGroupBuilderControlText } from "../formgroupbuilder.interface";
import { ControlBaseModel } from "./control.base.model.class";

type TRadioOptions = { label: string; value: any; }[];
type TRadioAttributes = {label: string; selected: any};

export class ControlRadioModel extends ControlBaseModel {

    value: TRadioOptions;
    attributes: TRadioAttributes;

    constructor(
        name: string, 
        instance: AbstractControl<any|any>, 
        value: TRadioOptions,
        attributes: TRadioAttributes,
        order?: number
    ) {
        super(name, instance, value, attributes, order);
        this.type = 'radio';
        this.value = value;
        this.attributes = attributes;
    }

}