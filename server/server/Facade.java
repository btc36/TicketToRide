package server;

import command.GenericCommand;
import model.*;
import static model.LobbyGameModel.State.*;

import java.util.List;

public class Facade
{
    protected String _className = "ExternalClientFacade";
    protected String _gameClassName = "IngameExternalClientFacade";
    protected final String _paramTypeString = "java.lang.String";
    protected final String _paramTypeBoolean = "java.lang.Boolean";
    protected final String _paramTypeInteger = "java.lang.Integer";
    protected final String _paramTypeDouble = "java.lang.Double";
    protected final String _paramTypeCharacter = "java.lang.Character";
    protected final String _paramTypeList = "java.util.List";
    protected final String _paramTypeMap = "java.util.Map";
    protected final String _paramTypeDate = "java.util.Date";
    protected final String _paramTypeGame = "LobbyGameModel";
    protected final String usernameError = "username empty";
    protected final String passwordError = "password empty";
    protected final String _modelPackage = "model.";
    protected final String _paramRoute = _modelPackage + "Route";
    protected final String _paramDestinationCard = _modelPackage + "DestinatinoCard";
    protected final String _paramTrainCard = _modelPackage + "TrainCard";



    public boolean isInputValid(String input) // empty? or not?
    {
        if(input == null) return false;
        if(input.isEmpty()) return false;
        return true;
    }
    public boolean findPlayer(PlayerModel player)
    {
        PlayerListModel allPlayers = ServerModel.getInstance().getAllPlayers();
        if(allPlayers.findPlayer(player))
            return true;
        else
            return false;
    }
    public PlayerModel getPlayer(String username)
    {
        PlayerListModel allPlayers = ServerModel.getInstance().getAllPlayers();
        PlayerModel player = allPlayers.getPlayerByUsername(username);
        return player;
    }
    public boolean playerExists(String username)
    {
        PlayerListModel allPlayers = ServerModel.getInstance().getAllPlayers();
        PlayerModel player = allPlayers.getPlayerByUsername(username);
        if(player != null)
            return true;
        else
            return false;
    }
    public boolean gameExists(String gameID)
    {
        LobbyGameModel game = ServerModel.getInstance().getAllGames().getGameByID(gameID);
        return game != null;
    }
    public LobbyGameModel getGameByID(String gameID)
    {
        return ServerModel.getInstance().getAllGames().getGameByID(gameID);
    }
    public List<LobbyGameModel> getGameAsList()
    {

        return ServerModel.getInstance().getAllGames().getGameList();
    }

    public void commandCheck(GenericCommand command)
    {
        assert(command.getTypeSize() == command.getValueSize());
    }

    public void commandListCheck(List<GenericCommand> commands)
    {
        for(GenericCommand command : commands)
            commandCheck(command);
    }
    public List<LobbyGameModel> getGame() { return ServerModel.getInstance().getAllGames().getGameList(); }
    public boolean isGameStarted(String gameID)
    {
        LobbyGameModel.State state  = getGameByID(gameID).getState();
        return state == ONGOING || state == LASTROUND || state == FINISHED;
        //return (getGameByID(gameID).getState() != WAITING);
    }

    protected String checkInput(String gameID, String username)
    {
        String message = "";
        message += checkPlayer(username);
        message += checkGame(gameID);
        return message;
    }

    protected String checkGame(String gameID)
    {
        String message = "";
        if(!isInputValid(gameID) || !gameExists(gameID)) { message += "invalid gameID"; }
        else if(!isGameStarted(gameID)) { message += "game did not start"; }
        return message;
    }


    protected String checkPlayer(String username)
    {
        String message = "";
        if(!isInputValid(username)) { message += "username is invalid\n"; }
        if(!playerExists(username)) { message += "user does not exist\n"; }
        return message;
    }

    protected Deck getDestinationDeck(String gameID)
    {
        LobbyGameModel game = getGameByID(gameID);
        return game == null ? null : game.getDestDeck();
    }

    protected Deck getTrainDeck(String gameID)
    {
        LobbyGameModel game = getGameByID(gameID);
        return game == null ? null : game.getTrainDeck();
    }

    protected GenericCommand failureCommand(String message, String methodName)
    {
        GenericCommand command = new GenericCommand(
                _gameClassName, methodName,
                new String[]{_paramTypeBoolean, _paramTypeString},
                new Object[]{false, message}
        );
        commandCheck(command);
        return command;
    }
    //
//    /**
//     @param move, timestamp, username, gameID
//     @return command that contains success, result message, gameID,
//     and all of the chat history associated with the gameID
//     */
//    public List<GenericCommand> sendGameHistory(String move, String username, String gameID)
//    {
//        String message = checkInput(gameID, username);
//        boolean success = false;
//        List<GenericCommand> commandsForClient = new ArrayList<>();
//        GenericCommand command;
//        ChatRoom room = null;
//        List<HistoryEntry> result = new ArrayList<>();
//
//        if(message.isEmpty())
//        {
//            success = true;
//            HistoryEntry entry = new HistoryEntry(move, username);
//            ServerModel.getInstance().addHistory(gameID, entry);
//            result.addAll(ServerModel.getInstance().getGameHistory(gameID)); // bad .. but... ㅈㄲ
//            message = sMessage + getHistory;
//        }
//
//        command = new GenericCommand(
//                _className, getHistory,
//                new String[]{_paramTypeBoolean, _paramTypeString, _paramTypeString, _paramTypeList},
//                new Object[]{success, message, gameID, result}
//        );
//
//        commandsForClient.add(command);
//
//        return commandsForClient;
//    }
//
//    public List<GenericCommand> getGameHistory(String gameID)
//    {
//        String message = checkGame(gameID);
//        boolean success = false;
//        List<GenericCommand> commandsForClient = new ArrayList<>();
//        GameHistory history = null;
//        List<HistoryEntry> result = new ArrayList<>();
//
//        if(message.isEmpty())
//        {
//            success = true;
//            history = ServerModel.getInstance().getGameHistorybyID(gameID);
//            result.addAll(history.getGameHistory());
//            message = sMessage + getHistory;
//        }
//
//        System.out.println(message);
//        GenericCommand command = new GenericCommand(
//                gameClass, getHistory,
//                new String[]{_paramTypeBoolean, _paramTypeString, _paramTypeString, _paramTypeList},
//                new Object[]{success, message, gameID, result}
//        );
//
//        commandCheck(command);
//        commandsForClient.add(command);
//        return commandsForClient;
//    }

}
