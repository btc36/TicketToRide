package communication;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import command.GenericCommand;

import java.util.ArrayList;
import java.util.List;

//Turns json into a list of GenericCommands and vise versa.
public class Serializer {

    //Turns json into list of GenericCommands
    public static List<GenericCommand> deserializeCommand(String json) throws Exception{
        ObjectMapper objectMapper = new ObjectMapper();
        List<GenericCommand> myCommands = objectMapper.readValue(json, new TypeReference<ArrayList<GenericCommand>>(){});
        return myCommands;
    }

    //Turns list of GenericCommands into json.
    public static String serializeCommand(List<GenericCommand> commands) {
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