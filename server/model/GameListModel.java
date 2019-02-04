package model;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class GameListModel
{
    private List<LobbyGameModel> gameList;
    private Map<String, LobbyGameModel> IDGameMap;

    public GameListModel()
    {
        gameList = new ArrayList<>();
    }

    public void addGame(LobbyGameModel game)
    {
        assert(game instanceof LobbyGameModel);
        gameList.add(game);
        IDGameMap.put(game.getGameID(), game);
    }
    public void removeGame(LobbyGameModel game)
    {
        assert(game instanceof LobbyGameModel);
        for(LobbyGameModel g : gameList)
        {
            if(g.equals(game))
                gameList.remove(g);
        }
        // no game found
    }
    public LobbyGameModel getGameByID(String gameID)
    {
        return IDGameMap.getOrDefault(gameID, null);
    }

}
