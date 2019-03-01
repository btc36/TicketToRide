package server;

import model.*;

import java.util.List;

public class Facade
{
    protected String _className = "ExternalClientFacade";
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
    public List<LobbyGameModel> getGameAsList()
    {

        return ServerModel.getInstance().getAllGames().getGameList();
    }
    private void test()
    {
        Deck deck = new DestinationCardDeck();
        deck.add(new TrainCard());
    }
}
