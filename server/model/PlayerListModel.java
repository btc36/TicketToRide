package model;

import java.util.ArrayList;
import java.util.List;

public class PlayerListModel
{
    private List<PlayerModel> playerList;

    PlayerListModel()
    {
        playerList = new ArrayList<>();
    }

    public void addPlayer(PlayerModel player)
    {
        assert(player instanceof PlayerModel);
        playerList.add(player);
    }
    public void removePlayer(PlayerModel player)
    {
        assert(player instanceof PlayerModel);
        for(int i = 0; i < playerList.size(); i++)
        {
            if(playerList.get(i).equals(player))
            {
                playerList.remove(i);
            }
        }
    }

    public List<PlayerModel> getPlayerList() {
        return playerList;
    }

    public void setPlayerList(List<PlayerModel> playerList) {
        this.playerList = playerList;
    }
}
