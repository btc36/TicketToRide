package model;

import java.util.*;

public class GameListModel
{
    private List<LobbyGameModel> gameList;
    private Map<String, LobbyGameModel> IDGameMap;
    private Set<LobbyGameModel> games;

    public GameListModel()
    {
//        gameList = new ArrayList<>();
        games = new HashSet<>();
        IDGameMap = new HashMap<>();
    }

    public void addGame(LobbyGameModel game)
    {
        assert(game instanceof LobbyGameModel);
        assert(game != null);
        games.add(game);
        IDGameMap.put(game.getGameID(), game);
//        gameList.add(game);
    }
    public void removeGame(LobbyGameModel game)
    {
        assert(game instanceof LobbyGameModel);
        assert(game != null);
        games.remove(game);
//        for(LobbyGameModel g : gameList)
//        {
//            if(g.equals(game))
//                gameList.remove(g);
//        }
        IDGameMap.remove(game.getGameID());
        // no game found
    }
    public LobbyGameModel getGameByID(String gameID)
    {
        assert(gameID != null);
        assert(!gameID.isEmpty());
        return IDGameMap.getOrDefault(gameID, null);
    }
    public List<LobbyGameModel> getGameList()
    {
        List<LobbyGameModel> list = new ArrayList<>();
        list.addAll(games);
        return list;
    }

}
