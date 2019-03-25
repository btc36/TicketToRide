package tester;

import command.GenericCommand;
import model.DestinationCard;
import model.LobbyGameModel;
import server.ServerFacade;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Phase2Tester
{
    public static void main(String[] args)
    {
        String divider = "----------------------------------------------";
        ServerFacade facade = new ServerFacade();

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
        List<GenericCommand> l = facade.startGame("game1");
        System.out.println("w");
        //        Date date = new Date();
//        facade.sendChat("HELLO", date,"user1", "game1" );
//        facade.sendChat("WORLD", date,"user2", "game1" );
//        facade.sendChat("QWERY", date,"user3", "game1" );
//        facade.sendChat("PPPP", date,"user3", "game1" );
//        facade.sendChat("HELLO", date,"user1", "game1" );
//        System.out.println(divider);
//        DestinationCard c1 = new DestinationCard("s", "d", 4);
//        DestinationCard c2 = new DestinationCard("s2", "d2", 5);
//        DestinationCard c3 = new DestinationCard("s3", "d3", 6);
//        System.out.println(divider);
//        List<DestinationCard> cards = new ArrayList<>();
//        cards.add(c1);
//        cards.add(c2);
//        cards.add(c3);
//        System.out.println(divider);
//        List<LobbyGameModel> games = facade.getGameAsList();
//        LobbyGameModel game = games.get(0);
//        facade.startGame(game.getGameID());
//        GameFacade g = new GameFacade();
//        g.discardDestinationCardCommand(game.getGameID(), cards);
//        g.drawDestinationCard(game.getGameID());
//        List<GenericCommand> result = g.potentialDestinationCard(game.getGameID());
//        GameFacade gameFacade = new GameFacade();
    }
}
