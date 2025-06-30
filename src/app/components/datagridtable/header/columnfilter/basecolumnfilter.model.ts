import { DatagridTableColumnFilterValueModel } from "./filtervalue.model";

export abstract class DatagridTableBaseColumnFilterModel {
    columnName: string = undefined;
    propPath: string[] = [];
    filterValues: DatagridTableColumnFilterValueModel[] = [];

    constructor() {
    }

    setFilterProperties(columnName: string, propPath: string[], filterValues: DatagridTableColumnFilterValueModel[]): void {
        this.columnName = columnName;
        this.propPath = propPath;
        this.filterValues = filterValues;
    }

    resetFilter(): void {
        this.filterValues = [];
    };
   
    abstract filterLocal(dataRow: unknown): boolean;
    abstract getMongoDbFilterObj(): object;
}