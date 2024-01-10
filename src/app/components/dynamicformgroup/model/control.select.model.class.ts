import { AbstractControl } from "@angular/forms";
import { IFormGroupBuilderControl, IFormGroupBuilderControlCheckbox, IFormGroupBuilderControlSelect, IFormGroupBuilderControlText } from "../formgroupbuilder.interface";
import { ControlBaseModel } from "./control.base.model.class";

type TSelectOptions = { label: string; value: string|number;}[];
type TSelectAttributes = {label: string, selected: string|number};

export class ControlSelectModel extends ControlBaseModel {

    options: TSelectOptions;
    attributes: TSelectAttributes;
    
    constructor(
        name: string, 
        instance: AbstractControl<any|any>, 
        options: TSelectOptions,
        attributes?: TSelectAttributes,
        order?: number
    ) {
        super(name, instance, options, attributes, order);
        this.type = 'select';
        this.options = options;
        this.attributes = attributes;
    }

}