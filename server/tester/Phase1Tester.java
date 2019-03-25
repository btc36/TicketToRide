package tester;

import server.ServerFacade;

public class Phase1Tester
{
    public static void main(String[] args)
    {
        String divier = "----------------------------------------------";
        ServerFacade facade = new ServerFacade();
        /*no user*/
        facade.login("lol", "lol");
        /*no password*/
        facade.login("lol", "");
        /*no username*/
        facade.login("", "lol");
        /*valid register*/
        facade.register("lol", "lol");
        /*duplicate register*/
        facade.register("lol", "brennah");
        /*wrong password*/
        facade.login("lol", "brennah");
        /*valid login*/
        facade.login("lol", "lol");

        facade.createGame("ss","game1","4");

//        /*Game SIZE*/
//        System.out.println("*******GAME SIZE INVALID******");
//        facade.createGame("lol","game1",1);
//        facade.createGame("lol","game1",6);
//
//        facade.createGame("lol","game1",4);
//        System.out.println("*******Null and empty game******");
//        facade.createGame("Rachel",null,4);
//        facade.createGame("Rachel","",4);
//        // ---> here I am guessing that one user cannot create two games?
//        // Agreeing on not worrying about this due to user won't leave the game
//        System.out.println("*******same user 2 games******");
//        facade.createGame("lol","game2",4);
//        facade.getGameList();
//        System.out.println(divier);
//        /*Invalid startGame*/
//        facade.startGame("game1");
//        /*Invalid joinGame*/
//        facade.joinGame("lol", "game1");
//        facade.joinGame("lol",  "Ross");
//        System.out.println("*******same user 2 games******");
//        facade.joinGame("lol", "game2");
//        facade.joinGame("Phoebe", "game2");
//        /*Valid register*/
//        facade.register("Rachel", "Green");
//        facade.createGame("Rachel","game2",4);
//        facade.joinGame("lol", "game2");
//        /*Invalid join*/
//        facade.joinGame("Rachel", "game1");
//        /*Invalid success*/
//        facade.startGame("game1");
//        facade.register("Joey", "Trib");
//        facade.login("Joey", "Trib");
//        facade.joinGame("Joey", "game1");
//        facade.startGame("game1");



    }
}
