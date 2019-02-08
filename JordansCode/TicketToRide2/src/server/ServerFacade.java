package server;
import Shared.GenericCommand;
import model.*;
//import Shared;
import org.ietf.jgss.GSSName;

/* Standard Library Import */
import java.lang.Boolean;
import java.lang.Integer;
import java.util.ArrayList;
import java.util.List;
//

public class ServerFacade
{
    private String _className = "package.ClientFacade";
    private final String _paramTypeString = "java.lang.String";
    private final String _paramTypeBoolean = "java.lang.Boolean";
    private final String _paramTypeInteger = "java.lang.Integer";
    private final String _paramTypeDouble = "java.lang.Double";
    private final String _paramTypeCharacter = "java.lang.Character";
    private final String _paramTypeList = "java.util.List";
    private final String _paramTypeMap = "java.util.Map";
    private final String _paramTypeGame = "";


    public List<GenericCommand> login(String username, String password)
    {
        List<GenericCommand> commandsForClient = new ArrayList<>();
        GenericCommand command = null;
        Boolean loginStatus = false;
        String message = "";
        if(!isInputValid(username))
            {message = "username empty";}
        else if(!isInputValid(password))
            {message = "password empty";}
        else
        {
            PlayerModel player = getPlayer(username);
            if(player == null) {message = "Such user does not exist";}
            else
            {
                if(password.equals(player.getPassword()))
                {
                    loginStatus = true;
                    message = "Success";
                }
                else if(!password.equals(player.getPassword()))
                {
                    message = "Wrong password";
                }
                else
                {
                    message = "Failure";
                }
            }
        }
        System.out.println(message);

        command = new GenericCommand(
          "ClientFacade", "loginStatus",
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
        if(!isInputValid(username)) {message = "username empty";}
        else if(!isInputValid(password)) {message = "password empty";}
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
                message = "Congratulations, register successful";
            }
        }

        System.out.println(message);
        command = new GenericCommand(
                "ClientFacade", "registerStatus",
                new String[]{_paramTypeBoolean, _paramTypeString},
                new Object[]{registerStatus, message}
        );
        commandsForClient.add(command);
        return commandsForClient;

    }
    public List<GenericCommand> createGame(String username, String gamename, int maxSize)
    {
        Boolean status = false;
        String message = "";

        if(!isInputValid(username)) { message = "invalid username"; }
        else if(!isInputValid(gamename)) { message = "invalid gamename"; }
        else if(maxSize > 5 && maxSize < 2) { message = "invalid maxsize"; }
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
            else
            {
                message = "user does not exist";
            }
        }

        List<GenericCommand> commandsForClient = new ArrayList<>();
        List<LobbyGameModel> games = getGameAsList();
        System.out.println(message);
        GenericCommand command = new GenericCommand(
                "ClientFacade", "createGame",
                new String[]{_paramTypeBoolean, _paramTypeString, _paramTypeList},
                new Object[]{status, message, games}
        );
        commandsForClient.add(command);
        return commandsForClient;
    }
    public List<GenericCommand> joinGame(String username, String gamename, String gameID)
    {
        List<GenericCommand> commandsForClient = new ArrayList<>();
        LobbyGameModel game = null;
        Boolean status = false;
        String message = "";

        if(!isInputValid(username)) { message = "Invalid Username"; }
        else if(!isInputValid(gamename)) { message = "Invalid Gamename"; }
        PlayerModel player = getPlayer(username);
        if(player == null) { message = "Invalid Player"; }
        else
        {
            game = ServerModel.getInstance().getGameByID(gameID);
            if(game == null)
            {
                message = "invalid gameID";
            }
            else if(game.getCurrentPlayerNum() > 4)
            {
                message = "game is full";
            }
            else if(game.getPlayerList().findPlayer(player))
            {
                message = "player already joined";
            }
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
                "ClientFacade", "joinGame",
                new String[]{_paramTypeBoolean, _paramTypeString, _paramTypeList},
                new Object[]{status, message, game}
        );
        commandsForClient.add(command);
        return commandsForClient;

    }
    public List<GenericCommand> startGame(String gameID)
    {
        List<GenericCommand> commandsForClient = new ArrayList<>();
        Boolean status = false;
        String message = "";

        if(!isInputValid(gameID))
        {
            status = false;
            message = "invalid request info";
        }
        else
        {
            LobbyGameModel game = ServerModel.getInstance().getGameByID(gameID);
            if(game != null)
            {
                if(game.getCurrentPlayerNum() < 2)
                {
                    message = "not enough players";
                }
                else
                {
                    game.startGame();
                    status = true;
                    message = "start success";
                }
            }
            else
            {
                status = false;
                message = "game does not exist";
            }
        }

        System.out.println(message);
        List<LobbyGameModel> games = getGameAsList();
        GenericCommand command;
        command = new GenericCommand(
                "ClientFacade", "startGame",
                new String[]{_paramTypeBoolean, _paramTypeList},
                new Object[]{status, message, games}
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
                "ClientFacade", "registerStatus",
                new String[]{_paramTypeBoolean, _paramTypeList},
                new Object[]{true, games}
        );
        commandsForClient.add(command);
        return commandsForClient;
    }

    private boolean isInputValid(String input)
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
