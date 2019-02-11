export class ClientCommandObjects {
    _className: string;
    _methodName: string;
    _paramTypes: any[];
    _paramValues: any[];
    constructor(classNameIn: string, methodNameIn: string, paramTypesIn: any[], paramValuesIn: any[]) {
        this._className = classNameIn;
        this._methodName = methodNameIn;
        this._paramTypes = paramTypesIn;
        this._paramValues = paramValuesIn;
    }
}
