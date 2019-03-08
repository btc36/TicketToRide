package server;

import command.GenericCommand;

import java.util.Date;
import java.util.List;

public class Phase2Tester
{
    public static void main(String[] args)
    {
        String divier = "----------------------------------------------";
        ServerFacade facade = new ServerFacade();

        facade.register("user1", "user1");
        facade.register("user2", "user2");
        facade.register("user3", "user3");
        facade.register("user4", "user4");


        facade.login("user1", "user1");
        facade.login("user2", "user2");
        facade.login("user3", "user3");
        facade.login("user4", "user4");

        facade.createGame("user1","game1","4");
        facade.joinGame("user2", "game1");
        facade.joinGame("user3", "game1");
        facade.joinGame("user4", "game1");

        Date date = new Date();
        facade.sendChat("HELLO", date,"user1", "game1" );
        facade.sendChat("WORLD", date,"user2", "game1" );
        facade.sendChat("QWERY", date,"user3", "game1" );
        facade.sendChat("PPPP", date,"user3", "game1" );
        facade.sendChat("HELLO", date,"user1", "game1" );




        GameFacade gameFacade = new GameFacade();





    }
}
