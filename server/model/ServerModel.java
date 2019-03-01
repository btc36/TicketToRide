package model;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class ServerModel
{
    private Map<String, PlayerModel> tokenToPlayerMap;
    private PlayerListModel allPlayers;
    private GameListModel allGames;
    private List<ChatRoom> allChatrooms;

    private static ServerModel _instance;
    private ServerModel()
    {
        allPlayers = new PlayerListModel();
        allGames = new GameListModel();
        allChatrooms = new ArrayList<>();
    }
    public static ServerModel getInstance()
    {
        if(_instance == null)
            _instance = new ServerModel();
        return _instance;
    }

    public Map<String, PlayerModel> getTokenToPlayerMap() {
        return tokenToPlayerMap;
    }

    public void setTokenToPlayerMap(Map<String, PlayerModel> tokenToPlayerMap) {
        this.tokenToPlayerMap = tokenToPlayerMap;
    }

    public PlayerListModel getAllPlayers() {
        return allPlayers;
    }

    public void setAllPlayers(PlayerListModel allPlayers) {
        this.allPlayers = allPlayers;
    }

    public GameListModel getAllGames() {
        return allGames;
    }
    public LobbyGameModel getGameByID(String gameID)
    {
        return allGames.getGameByID(gameID);
    }

    public void setAllGames(GameListModel allGames) {
        this.allGames = allGames;
    }

    public void registerPlayer(PlayerModel player)
    {
        allPlayers.addPlayer(player);
    }
    public void addGame(LobbyGameModel game)
    {
        allGames.addGame(game);
    }
    public void addChatRoom(ChatRoom chatRoom)
    {
        allChatrooms.add(chatRoom);
    }
    public List<ChatRoom> getChatrooms() { return allChatrooms;}
    public ChatRoom getChatRoombyID(String gameID)
    {
        for(ChatRoom room : allChatrooms)
        {
            if(room.getGameID().equals(gameID))
                return room;
        }
        return null;
    }

}

