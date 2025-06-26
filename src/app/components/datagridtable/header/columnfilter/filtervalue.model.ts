export class DatagridTableColumnFilterValueModel {
    value: string | number | boolean | Date | null;
    label?: string;
    type?: unknown;

    constructor(
        value: string | number | boolean | Date | null, 
        label?: string, 
        type?: unknown
    ) {
        this.value = value;
        this.label = label;
        this.type = type;
    }
}