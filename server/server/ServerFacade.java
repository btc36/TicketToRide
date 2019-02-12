package server;

import command.GenericCommand;
import model.*;
import org.ietf.jgss.GSSName;

/* Standard Library Import */
import java.lang.Boolean;
import java.lang.Integer;
import java.util.ArrayList;
import java.util.List;
//

public class ServerFacade
{
    private String _className = "ExternalClientFacade";
    private final String _paramTypeString = "java.lang.String";
    private final String _paramTypeBoolean = "java.lang.Boolean";
    private final String _paramTypeInteger = "java.lang.Integer";
    private final String _paramTypeDouble = "java.lang.Double";
    private final String _paramTypeCharacter = "java.lang.Character";
    private final String _paramTypeList = "java.util.List";
    private final String _paramTypeMap = "java.util.Map";
    private final String _paramTypeGame = "LobbyGameModel";
    private final String usernameError = "username empty";
    private final String passwordError = "password empty";


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

    public List<GenericCommand> createGame(String username, String gamename, String max)
    {
        Boolean status = false;
        String message = "";
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
            commandsForClient.add(command);
            return commandsForClient;
        }
        //Integer.getInteger(max);
    }
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
            else if(game.getCurrentPlayerNum() > 4) { message = "game is full"; }
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
                //new String[]{_paramTypeBoolean, _paramTypeString,_paramTypeList},
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
                new String[]{_paramTypeBoolean, _paramTypeList},
                new Object[]{true, "", games}
        );
        commandsForClient.add(command);
        return commandsForClient;
    }

    private boolean isInputValid(String input) // empty? or not?
    {
        if(input == null) return false;
        if(input.isEmpty()) return false;
        return true;
    }
    private boolean findPlayer(PlayerModel player)
    {
        PlayerListModel allPlayers = ServerModel.getInstance().getAllPlayers();
        if(allPlayers.findPlayer(player))
            return true;
        else
            return false;
    }
    private PlayerModel getPlayer(String username)
    {
        PlayerListModel allPlayers = ServerModel.getInstance().getAllPlayers();
        PlayerModel player = allPlayers.getPlayerByUsername(username);
        return player;
    }
    private boolean playerExists(String username)
    {
        PlayerListModel allPlayers = ServerModel.getInstance().getAllPlayers();
        PlayerModel player = allPlayers.getPlayerByUsername(username);
        if(player != null)
            return true;
        else
            return false;
    }
    private List<LobbyGameModel> getGameAsList()
    {
        return ServerModel.getInstance().getAllGames().getGameList();
    }
}
