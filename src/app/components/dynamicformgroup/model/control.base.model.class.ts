import { AbstractControl } from "@angular/forms";
import { IFormGroupBuilder, IFormGroupBuilderControl } from "../formgroupbuilder.interface";

type TControlOptions = {[key: string]: any};
type TControlAttributes = {[key: string]: any};

export class ControlBaseModel implements IFormGroupBuilderControl {

    name: string;
    type: 'text'|'password'|'select'|'checkbox'|'radio';
    instance?: AbstractControl<any|any>;
    value: any;
    options: TControlOptions;
    attributes?: TControlAttributes;
    order?: number;

    constructor(
        name: string,
        instance: AbstractControl<any|any>,
        options: TControlOptions,
        attributes?: TControlAttributes,
        order?: number
    ) {
        this.name = name;
        this.type = null;
        this.instance = instance;
        this.options = options;
        this.attributes = attributes;
        this.order = order;
    }

}
