package server;

import command.GenericCommand;
import model.DestinationCard;
import model.LobbyGameModel;
import model.Route;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

public class Phase3Tester
{
    public static void main(String[] args)
    {
        String divider = "----------------------------------------------";
        ServerFacade facade = new ServerFacade();
        GameFacade game = new GameFacade();

        facade.register("user1", "user1");
        facade.register("user2", "user2");
        facade.register("user3", "user3");
        facade.register("user4", "user4");
        System.out.println(divider);
        facade.login("user1", "user1");
        facade.login("user2", "user2");
        facade.login("user3", "user3");
        facade.login("user4", "user4");
        System.out.println(divider);
        facade.createGame("user1","game1","4");
        facade.joinGame("user2", "game1");
        facade.joinGame("user3", "game1");
        facade.joinGame("user4", "game1");
        System.out.println(divider);
        facade.startGame("game1");
        List<String> colors = Arrays.asList(new String[] {"blue", "blue", "blue", "blue", "blue"});
        List<GenericCommand> l =  game.claimRoute("game1", "user1", "Miami", "Atlanta", "blue", 5, colors);
        colors = Arrays.asList(new String[] {"grey"});
        List<GenericCommand> t =  game.claimRoute("game1", "user1", "Nashville", "Atlanta", "grey", 1, colors);
        game.endTurn("game1", "user1");
        System.out.println("FINISHED\n");
        game.lastRound("game1");
        game.endTurn("game1", "user1");


    }
}
