import { DatagridTableColumnFilterValueModel } from "./filtervalue.model";

export abstract class DatagridTableBaseColumnFilterModel {
    columnName: string = undefined;
    propPath: string[] = [];
    filterValues: DatagridTableColumnFilterValueModel[] = [];

    constructor(columnName: string, propPath: string[], filterValues?: DatagridTableColumnFilterValueModel[]) {
        this.columnName = columnName;
        this.propPath = propPath;
        this.filterValues = filterValues;
    }

    resetFilter(): void {
        this.filterValues = [new DatagridTableColumnFilterValueModel('')];
    };
    

    abstract filterLocal(dataRow: unknown): boolean;
    abstract getMongoDbFilterObj(): object;
}