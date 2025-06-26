import { DatagridTableColumnFilterValueModel } from "../filtervalue.model";

export class DatagridTableStringfilterModel {
    columnName: string = undefined
    propPath: string[] = [];
    filterValues: DatagridTableColumnFilterValueModel[] = [];

    constructor(columnName: string, propPath: string[], filterValues: DatagridTableColumnFilterValueModel[]) {
        this.columnName = columnName;
        this.propPath = propPath;
        this.filterValues = filterValues;
    }

}