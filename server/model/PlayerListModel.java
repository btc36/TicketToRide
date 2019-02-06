package model;

import java.util.*;

public class PlayerListModel
{
//    private HashMap<>
    private Set<PlayerModel> players;
    private HashMap<PlayerModel, Boolean> usernameMap;
    //private List<PlayerModel> playerList;

    PlayerListModel()
    {
      //  playerList = new ArrayList<>();
        usernameMap = new HashMap<>();
        players = new HashSet<>();
    }

    public void addPlayer(PlayerModel player)
    {
        assert(player instanceof PlayerModel);
        players.add(player);
        usernameMap.put(player, true);
        //playerList.add(player);
    }
    public void removePlayer(PlayerModel player)
    {
        assert(player instanceof PlayerModel);
        usernameMap.remove(player);
        players.remove(player);
//        for(int i = 0; i < playerList.size(); i++)
//        {
//            if(playerList.get(i).equals(player))
//            {
//                playerList.remove(i);
//            }
//        }
    }

    public Boolean findPlayer(PlayerModel player)
    {
        return players.contains(player);
        //return usernameMap.getOrDefault(player, false);
//        for(int i = 0; i < playerList.size(); i++)
//        {
//            if(playerList.get(i).getUsername().equals(player.getUsername()))
//            {
//                return true;
//            }
//        }
//        return false;
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
        Set<PlayerModel> set = usernameMap.keySet();
        List<PlayerModel> playerList = new ArrayList<>();
        playerList.addAll(set);
        return playerList;
    }



}
