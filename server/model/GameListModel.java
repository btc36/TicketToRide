package model;

import java.util.*;

public class GameListModel
{
    private List<LobbyGameModel> games;
    private Deck destDeck;
    private Deck trainDeck;

    public GameListModel()
    {
        games = new ArrayList<>();
    }

    public void addGame(LobbyGameModel game)
    {
        assert(game instanceof LobbyGameModel);
        assert(game != null);
        games.add(game);
    }
    public void removeGame(LobbyGameModel game)
    {
        assert(game instanceof LobbyGameModel);
        assert(game != null);
        games.remove(game);
    }
    public void removeGame(String gameID)
    {
        assert(gameID != null);
        assert(!gameID.isEmpty());

        for(int i = 0; i < games.size(); i++)
        {
            if(games.get(i).getGameID().equals(gameID))
                games.remove(i);
        }
    }
    public LobbyGameModel getGameByID(String gameID)
    {
        assert(gameID != null);
        assert(!gameID.isEmpty());
        for(int i = 0; i < games.size(); i++)
        {
            if(games.get(i).getGameID().equals(gameID))
                return games.get(i);
        }
        return null;
    }
    public List<LobbyGameModel> getGameList()
    {
        return games;
    }


}
