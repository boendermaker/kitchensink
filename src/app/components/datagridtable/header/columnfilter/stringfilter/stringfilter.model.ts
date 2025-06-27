import { DatagridTableBaseColumnFilterModel } from "../basecolumnfilter.model";
import { DatagridTableColumnFilterValueModel } from "../filtervalue.model";

export class DatagridTableStringfilterModel extends DatagridTableBaseColumnFilterModel {

    constructor(
        columnName: string, 
        propPath: string[], 
        filterValues: DatagridTableColumnFilterValueModel[]
    ) {
        super(columnName, propPath, filterValues);
    }

    //###########################

    filterLocal(dataRow: unknown): boolean {
        if(this.filterValues[0]?.value) {
            const regex = new RegExp(`.*${this.filterValues[0].value}.*`, 'i');
            return this.propPath.some((propPathDestination) => {
                const value = dataRow[propPathDestination];
                return typeof value === 'string' && regex.test(value);
            });
        }
        return true;
    }

    //###########################

    getMongoDbFilterObj() {
        if(this.filterValues[0].value) {
            const regexFilter = {$regex: `.*(?i)${this.filterValues[0].value}.*`};
            const filterBuildArray = [];
            
            this.propPath.forEach((propPathDestination) => {
                filterBuildArray.push({[`${propPathDestination}`]: regexFilter});
            });

            const filter = {
                $or: filterBuildArray,
            };

            return filter;
        }
    }

}