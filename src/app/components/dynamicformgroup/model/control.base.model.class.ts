import { AbstractControl, FormControl } from "@angular/forms";

type TControlOptions = {[key: string]: any};
type TControlAttributes = {[key: string]: any};

export class ControlBaseModel {
    
    name: string;
    type: 'text'|'password'|'select'|'checkbox'|'radio';
    instance?: FormControl;
    options: TControlOptions;
    attributes?: TControlAttributes;
    order?: number;

    constructor(
        name: string, 
        instance: FormControl, 
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