export class ClientCommandObjects {
    className: string;
    methodName: string;
    paramTypes: [];
    paramValues: [];
    constructor(public classNameIn: string, public methodNameIn: string, public paramTypesIn: [], public paramValuesIn: []) {
        this.className = classNameIn;
        this.methodName = methodNameIn;
        this.paramTypes = paramTypesIn;
        this.paramValues = paramValuesIn;
    }
}