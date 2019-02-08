package model;

import java.util.*;

public class PlayerListModel
{
    private List<PlayerModel> players;

    PlayerListModel()
    {
        players = new ArrayList<>();
    }

    public void addPlayer(PlayerModel player)
    {
        assert(player instanceof PlayerModel);
        players.add(player);
    }
    public void removePlayer(PlayerModel player)
    {
        assert(player instanceof PlayerModel);
        players.remove(player);
    }
    public void removePlayer(String username)
    {
        for(int i = 0; i < players.size(); i++)
        {
            if(players.get(i).getUsername().equals(username))
            {
                players.remove(i);
            }
        }
    }

    public boolean findPlayer(PlayerModel player)
    {
        return players.contains(player);
    }

    public boolean findPlayer(String username)
    {
        for(int i = 0; i < players.size(); i++)
        {
            if(players.get(i).getUsername().equals(username))
            {
                return true;
            }
        }
        return false;
    }
    public PlayerModel getPlayerByUsername(String username)
    {
        for(PlayerModel player : players)
            if(player.getUsername().equals(username))
                return player;

        return null;
    }
    public List<PlayerModel> getPlayerList()
    {
        return players;
    }

}
