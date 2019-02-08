export class ClientCommandObjects {
    className: string;
    methodName: string;
    paramTypes: any[];
    paramValues: any[];
    constructor(public classNameIn: string, public methodNameIn: string, public paramTypesIn: any[], public paramValuesIn: any[]) {
        this.className = classNameIn;
        this.methodName = methodNameIn;
        this.paramTypes = paramTypesIn;
        this.paramValues = paramValuesIn;
    }
}
