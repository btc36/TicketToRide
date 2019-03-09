package server;
import command.GenericCommand;
import model.*;

/* Standard Library Import */
import java.lang.Boolean;
import java.lang.Integer;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ServerFacade extends Facade
{


    private final String loginSatus = "loginStatus";
    private final String registerStatus = "registerStatus";
    private final String joinGame = "joinGame";

    /**
     *
     * @param username
     * @param password
     * @return a list of Generic Command that contains clientfacade class name, status, message
     */
    public List<GenericCommand> login(String username, String password)
    {
        List<GenericCommand> commandsForClient = new ArrayList<>();
        GenericCommand command = null;
        Boolean loginStatus = false;
        String message = "";
        if(!isInputValid(username))
            {message = usernameError;}
        else if(!isInputValid(password))
            {message = passwordError;}
        else
        {
            PlayerModel player = getPlayer(username);
            if(player == null) {message = "Such user does not exist";}
            else
            {
                if(password.equals(player.getPassword()))
                {
                    loginStatus = true;
                    message = username;
                }
                else if(!password.equals(player.getPassword())) { message = "Wrong password"; }
                else { message = "Failure"; }
            }
        }
        System.out.println(message);

        command = new GenericCommand(
                _className, "loginStatus",
                new String[]{_paramTypeBoolean, _paramTypeString},
                new Object[]{loginStatus, message}
        );
        commandsForClient.add(command);
        return commandsForClient;
    }

    /**
     *
     * @param username
     * @param password
     * @return a list of Generic Command that contains clientfacade class name, status, message
     */
    public List<GenericCommand> register(String username, String password)
    {
        List<GenericCommand> commandsForClient = new ArrayList<>();
        GenericCommand command;
        Boolean registerStatus = false;
        String message = "";
        if(!isInputValid(username)) {message = usernameError;}
        else if(!isInputValid(password)) {message = passwordError;}
        else
        {
            PlayerModel player = new PlayerModel(username, password);
            if(findPlayer(player))
            {
                registerStatus = false;
                message = "Username already exists";
            }
            else
            {
                ServerModel.getInstance().registerPlayer(player);
                registerStatus = true;
                message = username;
            }
        }

        System.out.println(message);
        command = new GenericCommand(
                _className, "registerStatus",
                new String[]{_paramTypeBoolean, _paramTypeString},
                new Object[]{registerStatus, message}
        );
        commandsForClient.add(command);
        return commandsForClient;

    }

    /**
     *
     * @param username
     * @param gamename
     * @param max
     * @return a list of Generic Command that contains clientfacade class name, status, message, and all of the games in server
     */
    public List<GenericCommand> createGame(String username, String gamename, String max)
    {
        Boolean status = false;
        String message = "";
        String gameID = "";
        try
        {
            int maxSize = Integer.parseInt(max);
            if(!isInputValid(username)) { message = "invalid username"; }
            else if(!isInputValid(gamename)) { message = "invalid gamename"; }
            else if(maxSize > 5 || maxSize < 2) { message = "invalid maxsize"; }
            else
            {
                // allow multiple same gamename
                PlayerModel player = getPlayer(username);
                if(player != null)
                {
                    LobbyGameModel game = new LobbyGameModel(player,maxSize,gamename);
                    game.setGamename(gamename);
                    ServerModel.getInstance().addGame(game);
                    status = true;
                    message = "success";
                    gameID = game.getGameID();
                }
                else { message = "user does not exist"; }
            }
        }
        catch(NumberFormatException e)
        {
            message = "umm give real number?";
        }
        finally
        {
            List<GenericCommand> commandsForClient = new ArrayList<>();
            List<LobbyGameModel> games = getGameAsList();
            System.out.println(message);
            GenericCommand command = new GenericCommand(
                    _className, "updateGameList",
                    new String[]{_paramTypeBoolean, _paramTypeString, _paramTypeList},
                    new Object[]{status, message, games}
            );
            GenericCommand command2 = new GenericCommand(
                    _className, "joinGame",
                    new String[]{_paramTypeString},
                    new Object[]{true, "success", gameID}
            );
            commandsForClient.add(command);
            commandsForClient.add(command2);
            return commandsForClient;
        }
        //Integer.getInteger(max);
    }

    /**
     *
     * @param username
     * @param gameID
     * @return
     */
    public List<GenericCommand> joinGame(String username, String gameID)
    {
        List<GenericCommand> commandsForClient = new ArrayList<>();
        LobbyGameModel game = null;
        Boolean status = false;
        String message = "";

        if(!isInputValid(username)) { message = usernameError; }
        else if(!isInputValid(gameID)) { message = "Invalid GameID"; }
        PlayerModel player = getPlayer(username);
        if(player == null) { message = "Invalid Player"; }
        else
        {
            game = ServerModel.getInstance().getGameByID(gameID);
            if(game == null) { message = "invalid gameID"; }
            else if(game.getCurrentPlayerNum() + 1 > game.getMaxPlayer()) { message = "game is full"; }
            else if(game.getPlayerList().findPlayer(username)) { message = "you already joined this game";}
            else
            {
                game.addPlayer(player);
                status = true;
                message = "join successful";
            }
        }

        System.out.println(message);
        List<LobbyGameModel> games = getGameAsList();
        GenericCommand command;
        command = new GenericCommand(
                _className, "joinGame",
                new String[]{_paramTypeBoolean, _paramTypeString, _paramTypeString},
                //new String[]{_paramTypeBoolean, _paramTypeString, _paramTypeList},
                new Object[]{status, message, gameID}
        );
        commandsForClient.add(command);
        return commandsForClient;
    }

    /**
     *
     * @param gameID
     * @return a list of command clientfacade name, message, gameID
     */
    public List<GenericCommand> startGame(String gameID)
    {
        List<GenericCommand> commandsForClient = new ArrayList<>();
        Boolean status = false;
        String message = "";

        if(!isInputValid(gameID)) { message = "invalid request info"; }
        else
        {
            LobbyGameModel game = ServerModel.getInstance().getGameByID(gameID);
            if(game != null)
            {
                if(game.getCurrentPlayerNum() < 2) { message = "not enough players"; }
                else
                    {
                    game.startGame();
                    status = true;
                    message = "start success";
                }
            }
            else { message = "game does not exist"; }
        }

        System.out.println(message);
        List<LobbyGameModel> games = getGameAsList();
        GenericCommand command;
        command = new GenericCommand(
                _className, "startGame",
                new String[]{_paramTypeBoolean, _paramTypeString,_paramTypeString},
                new Object[]{status, message, gameID}
        );
        commandsForClient.add(command);
        return commandsForClient;
    }
    public List<GenericCommand> getGameList()
    {
        List<GenericCommand> commandsForClient = new ArrayList<>();
        Boolean status = true;
        List<LobbyGameModel> games = getGameAsList();
        GenericCommand command;
        command = new GenericCommand(
                _className, "updateGameList",
                new String[]{_paramTypeBoolean, _paramTypeString, _paramTypeList},
                new Object[]{true, "", games}
        );
        commandsForClient.add(command);
        return commandsForClient;
    }


    /**
    @param chatMessage, timestamp, username, gameID
    @return command that contains success, result message, gameID,
    and all of the chat history associated with the gameID
     */
    public List<GenericCommand> sendChat(String chatMessage, Date time, String username, String gameID)
    {
        String message = "";
        boolean success = false;
        List<GenericCommand> commandsForClient = new ArrayList<>();
        GenericCommand command;
        ChatRoom room = null;
        List<ChatMessage> result = new ArrayList<>();

        if(!playerExists(username)) message = "invalid username";
        else if(!gameExists(gameID)) message = "invalid gameID";
        else
        {
            success = true;
            ChatMessage chat = new ChatMessage(chatMessage, time, username);
            ServerModel.getInstance().addChat(gameID, chat);
            room = ServerModel.getInstance().getChatRoombyID(gameID);
            result = room.getMessages();
        }

        command = new GenericCommand(
                _className, "receiveChatCommand",
                new String[]{_paramTypeBoolean, _paramTypeString, _paramTypeString, _paramTypeList},
                new Object[]{success, message, gameID, result}
        );

        commandsForClient.add(command);
        return commandsForClient;
    }
}
