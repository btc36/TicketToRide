package Communication;

import Shared.GenericCommand;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.ArrayList;

//Turns json into a list of GenericCommands and vise versa.
public class Serializer {

    //Turns json into list of GenericCommands
    public static ArrayList<GenericCommand> deserializeCommand(String json) throws Exception{
        ObjectMapper objectMapper = new ObjectMapper();
        ArrayList<GenericCommand> myCommands = objectMapper.readValue(json, new TypeReference<ArrayList<GenericCommand>>(){});
        return myCommands;
    }

    //Turns list of GenericCommands into json.
    public static String serializeCommand(ArrayList<GenericCommand> commands) {
        String json = "Error parsing json. Please check format.";
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            json = objectMapper.writeValueAsString(commands);
        }
        catch (Exception e){
            System.out.println("Error in serializeCommand turning object into json: " + e.toString());
        }
        return json;
    }
}