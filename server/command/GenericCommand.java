package command;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
//code from:https://students.cs.byu.edu/~cs340ta/winter2019/notes/woodfield/05-Command/CommandExample.java

public class GenericCommand implements CommandInterface,java.io.Serializable  {
    private String _className;
    private String _methodName;
    private Class<?>[] _paramTypes;
    private Object[] _paramValues;

    @JsonCreator
    //Special constructor needed for Jackson to work.
    public GenericCommand(@JsonProperty("_className") String className,
                          @JsonProperty("_methodName") String methodName,
                          @JsonProperty("_paramTypes") String[] paramTypes,
                          @JsonProperty("_paramValues") Object[] paramValues)
    throws IllegalArgumentException {
        if(className == null)
            throw new IllegalArgumentException("Parameter className was not informed.");
        if(methodName == null)
            throw new IllegalArgumentException("Parameter methodName was not informed.");
        if(paramTypes == null)
            System.out.println("Parameter paramTypes was not informed.");
        if(paramValues == null)
            System.out.println("Parameter paramValues was not informed.");
        _className = className;
        _methodName = methodName;
        try {
            _paramTypes = new Class<?>[paramTypes.length];
            for(int i = 0; i < paramTypes.length; i++) {
                _paramTypes[i] = Class.forName(paramTypes[i]);
            }
        }
        catch (Exception e) {
            throw new IllegalArgumentException("paramType not valid");
        }
        _paramValues = paramValues;
    }

    //@Override
    public List<GenericCommand> execute() {
        List<GenericCommand> out = new ArrayList<GenericCommand>();
        try {
            Class<?> receiver = Class.forName(_className);
            Method method = receiver.getMethod(_methodName, _paramTypes);
            Object t = receiver.newInstance();
            out = (List<GenericCommand>) method.invoke(t, _paramValues);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return out;
    }

    @Override
    //these are needed for main.resources.jackson to work
    public String toString() {
        return("Generic command for class: " + _className + "\nMethod: " + _methodName + "\n");
    }


    public String get_className() {
        return _className;
    }

    public void set_className(String _className) {
        this._className = _className;
    }

    public String get_methodName() {
        return _methodName;
    }

    public void set_methodName(String _methodName) {
        this._methodName = _methodName;
    }

    public Class<?>[] get_paramTypes() {
        return _paramTypes;
    }

    public void set_paramTypes(Class<?>[] _paramTypes) {
        this._paramTypes = _paramTypes;
    }

    public Object[] get_paramValues() {
        return _paramValues;
    }

    public void set_paramValues(Object[] _paramValues) {
        this._paramValues = _paramValues;
    }
}