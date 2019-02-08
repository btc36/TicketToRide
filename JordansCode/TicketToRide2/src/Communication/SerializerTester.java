package Communication;
import Shared.*;
import java.util.ArrayList;

public class SerializerTester {

    //makes a dummy object, turns it into json, and then turns it BACK into object.
    static public void serializerTest() {
        GenericCommand testCommandObj = new GenericCommand("classyClass", "methodyMethod", new Class<?>[]{ String.class }, new Object[] { "woooooo" });
        ArrayList<GenericCommand> testListOfCommands = new ArrayList();
        ArrayList<GenericCommand> jsonTurnedBackIntoObject = new ArrayList<GenericCommand>();
        testListOfCommands.add(testCommandObj);

        String json = Communication.Serializer.serializeCommand(testListOfCommands);

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
