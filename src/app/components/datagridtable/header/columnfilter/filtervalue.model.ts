/* eslint-disable prettier/prettier */
export class DatagridTableColumnFilterValueModel {
    value: string | number | boolean | Date | null;
    id?: string;
    label?: string;
    type?: unknown;

    constructor(
        value: string | number | boolean | Date | null,
        id?: string,
        label?: string,
        type?: unknown
    ) {
        this.value = value;
        this.id = id;
        this.label = label;
        this.type = type;
    }
}
