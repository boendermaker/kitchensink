import { DatagridTableBaseColumnFilterModel } from "../basecolumnfilter.model";

export class DatagridTableStringfilterCustomModel extends DatagridTableBaseColumnFilterModel {

    constructor() {
        super();
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
        if(this.filterValues[0]?.value) {
            const regexFilter = {$regex: `.*(?i)${this.filterValues[0].value}.*`};
            const filterBuildArray = [];
            
            this.propPath.forEach((propPathDestination) => {
                filterBuildArray.push({[`${propPathDestination}`]: regexFilter});
            });

            filterBuildArray.push({$and: 'CUSTOM_FILTER'});

            const filter = {
                $or: filterBuildArray,
            };

            return filter;
        }
    }

}