import model.*;
import org.ietf.jgss.GSSName;

/* Standard Library Import */
import java.lang.Boolean;
import java.lang.Integer;
import java.util.ArrayList;
import java.util.List;


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


    public List<GenericCommand> login(String username, String password)
    {
        List<GenericCommand> commandsForClient = new ArrayList<>();
        GenericCommand command = null;
        Boolean loginStatus = false;
        String message = "";
        if(isValidUsername(username) && isValidPassword(password))
        {
            loginStatus = false;
            message = "username or password empty";
        }
        else
        {
            PlayerModel player = new PlayerModel(username,password);
            if(!findPlayer(player))
            {
                loginStatus = false;
                message = "Such user does not exist";
            }
            if(password.equals(player.getPassword()))
            {
                loginStatus = true;
                message = "Success";
            }
            else
            {
                loginStatus = false;
                message = "Failure";
            }
        }

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
        if(isValidUsername(username) && isValidPassword(password))
        {
            registerStatus = false;
            message = "username or password empty";
        }
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

        if(!isValidUsername(username))
        {
            message = "invalid username";
        }
        else if(!isValidGame(gamename))
        {
            message = "invalid gamename";
        }
        else if(maxSize > 5 && maxSize < 2)
        {
            message = "invalid maxsize";
        }
        else
        {
            // allow multiple same gamename
            LobbyGameModel game = new LobbyGameModel();
            game.setGamename(gamename);
            ServerModel.getInstance().addGame(game);
            status = true;
            message = "success";
        }

        List<GenericCommand> commandsForClient = new ArrayList<>();
        List<LobbyGameModel> games = getGameAsList();

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
        Boolean status = false;
        String message = "";

        if(!isValidUsername(username))
        {
            message = "Invalid Username";
        }
        else if(!isValidGame(gamename))
        {
            message = "Invalid Gamename";
        }
        PlayerModel player = new PlayerModel(username);
        if(!findPlayer(player))
        {
            message = "Invalid Player";
        }
        else
        {
            LobbyGameModel game = ServerModel.getInstance().getGameByID(gameID);

            if(game.getCurrentPlayerNum() > 4)
            {
                message = "game is full";
            }
            else
            {
                game.addPlayer(player);
                status = true;
            }

        }

        List<LobbyGameModel> games = getGameAsList();
        GenericCommand command;
        command = new GenericCommand(
                "ClientFacade", "joinGame",
                new String[]{_paramTypeBoolean, _paramTypeString, _paramTypeList},
                new Object[]{status, message, games}
        );
        commandsForClient.add(command);
        return commandsForClient;

    }
    public List<GenericCommand> startGame(String gameID)
    {
        List<GenericCommand> commandsForClient = new ArrayList<>();
        Boolean status = false;
        String message = "";

        if(!isValidGame(gameID))
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
                    message = "success";
                }
            }
            else
            {
                status = false;
                message = "game does not exist";
            }
        }

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

    private boolean isValidUsername(String username)
    {
        if(username == null)
        {
            return false;
        }
        if(username.isEmpty())
        {
            return false;
        }
        return true;
    }
    private boolean isValidPassword(String password)
    {
        if(password == null)
        {
            return false;
        }
        if(password.isEmpty())
        {
            return false;
        }
        return true;
    }
    private boolean isValidGame(String gameID)
    {
        if(gameID == null) return false;
        if(gameID.isEmpty()) return false;
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
    private List<LobbyGameModel> getGameAsList()
    {
        return ServerModel.getInstance().getAllGames().getGameList();
    }
}
