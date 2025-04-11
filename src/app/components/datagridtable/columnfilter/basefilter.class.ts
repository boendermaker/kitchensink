


export abstract class BaseColumnFilter {
    
    abstract filterCallback<T>(dataRow: T, targetPaths: string[]): boolean

}