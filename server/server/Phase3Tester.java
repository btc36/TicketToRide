package server;

import command.GenericCommand;
import model.DestinationCard;
import model.LobbyGameModel;
import model.Route;

import java.util.ArrayList;
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

        List<GenericCommand> l =  game.claimRoute("game1", "user1", "Phoenix", "El Paso", "grey", 1);

        System.out.println("w");

    }
}
