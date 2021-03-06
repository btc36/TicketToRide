package communication;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import command.GenericCommand;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.util.ArrayList;
import java.util.List;


public class CommandHandler implements HttpHandler {
    Boolean verbose = true;
    List<String> alreadyPrintedCommands = new ArrayList<>();

    public void handle(HttpExchange httpExchange) {
        List<GenericCommand> response = new ArrayList<>();

        try {
            List<GenericCommand> myCommands = receiveCommand(httpExchange);
            for(GenericCommand command : myCommands) {
                response.addAll(command.execute());
            }
            try {
                sendCommand(httpExchange, response);
            }
            catch (Exception e) {
                System.out.println(e.toString());
                httpExchange.sendResponseHeaders(HttpURLConnection.HTTP_SERVER_ERROR, 0);
            }
        }
        catch (Exception e){
            System.out.println(e.toString());
            e.printStackTrace();
        }
    }


    //gets the list of GenericCommands from http exchange object
    protected List<GenericCommand> receiveCommand(HttpExchange httpExchange) throws Exception{
        String json = receiveJson(httpExchange);
        if(verbose) {
            if(json.contains("getChatHistory") || json.contains("getGameList") || json.contains("whoseTurn")) {}
            else {
                System.out.println("sending: " + json);
            }
        }
        List<GenericCommand> myCommands = Serializer.deserializeCommand(json);
        return myCommands;
    }

    //sends list of GenericCommands using http exchange object
    protected void sendCommand(HttpExchange httpExchange, List<GenericCommand> commands) {
        //if(verbose) {System.out.println("sendCommand called for list of commands of size: " + commands.size());}
        String json = Serializer.serializeCommand(commands);
        if(verbose) {
            if(json.contains("updateGameList") || json.contains("receiveChatCommand") || json.contains("whoseTurn") || json.contains("currentTurn")) {}
            else {
                System.out.println("sending: " + json);
            }
        }
        sendJson(httpExchange, json);
    }

    //helper function for receiveCommand()
    private static String receiveJson(HttpExchange exchange) throws Exception{
        String str = "";
        InputStreamReader isr =  new InputStreamReader(exchange.getRequestBody(),"utf-8");
        BufferedReader br = new BufferedReader(isr);
        String line;
        while ((line = br.readLine()) != null) {
            str += line + "\n";
        }
        if(str.endsWith("\n")) {
            str = str.substring(0, str.length() - 1);
        }
        br.close();
        isr.close();
        return str;
    }

    //helper function for sendCommand()
    private static void sendJson(HttpExchange exchange, String outStr) {
        exchange.getResponseHeaders().set("Content-Type", "appication/json");
        PrintWriter out = null;
        try {
            exchange.sendResponseHeaders(HttpURLConnection.HTTP_OK, 0);
            out = new PrintWriter(exchange.getResponseBody());
            out.print(outStr);
        }
        catch(Exception e) {
            System.out.println(e.toString());
        }
        finally {
            if(out != null) {
                out.close();
            }
        }
    }
}
