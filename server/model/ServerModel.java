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
    private List<GameHistory> allGameHistory;

    private static ServerModel _instance;
    private ServerModel()
    {
        allPlayers = new PlayerListModel();
        allGames = new GameListModel();
        allChatrooms = new ArrayList<>();
        allGameHistory = new ArrayList<>();
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
    public void addChat(String gameID, ChatMessage message)
    {
        ChatRoom room = getChatRoombyID(gameID);
        if(room == null)
        {
            room = new ChatRoom(gameID);
            room.addChat(message);
            addChatRoom(room);
        }
        else
        {
            room.addChat(message);
        }

    }

    public void addHistory(String gameID, HistoryEntry entry)
    {

        GameHistory history = getGameHistorybyID(gameID);
        if(history == null)
        {
            history = new GameHistory(gameID);
            history.addHistory(entry);
            allGameHistory.add(history);
        }
        else
        {
            history.addHistory(entry);
        }
    }
    public ChatRoom getChatRoombyID(String gameID)
    {
        for(ChatRoom room : allChatrooms)
        {
            if(room.getGameID().equals(gameID))
                return room;
        }
        return null;
    }

    public GameHistory getGameHistorybyID(String gameID)
    {
        for(GameHistory history : allGameHistory)
        {
            if(history.getGameID().equals(gameID))
                return history;
        }
        return null;
    }

}

