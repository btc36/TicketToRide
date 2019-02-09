package communication;
import command.GenericCommand;

import java.util.ArrayList;
import java.util.List;

public class SerializerTester {

    //makes a dummy object, turns it into json, and then turns it BACK into object.
    static public void serializerTest() {
        GenericCommand testCommandObj = new GenericCommand("classyClass", "methodyMethod", new String[] {"java.lang.String"}, new Object[] { "woooooo" });
        List<GenericCommand> testListOfCommands = new ArrayList();
        List<GenericCommand> jsonTurnedBackIntoObject = new ArrayList<GenericCommand>();
        testListOfCommands.add(testCommandObj);

        String json = Serializer.serializeCommand(testListOfCommands);

        try {
            jsonTurnedBackIntoObject = Serializer.deserializeCommand(json);
        }
        catch (Exception e) {
            System.out.println("error 19");
            System.out.println(e.toString());
        }

        if(testListOfCommands.get(0).get_className().equals(jsonTurnedBackIntoObject.get(0).get_className()) &&
                testListOfCommands.get(0).get_methodName().equals(jsonTurnedBackIntoObject.get(0).get_methodName())) {
            System.out.println("Test Passed");
        }
    }

    public static void main(String[] args) {
        serializerTest();
    }
}
