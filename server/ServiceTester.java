public class ServiceTester
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

        facade.createGame("ss","game1",4);
        facade.createGame("lol","game1",4);
        System.out.println("Null and empty game");
        facade.createGame("Rachel",null,4);
        facade.createGame("Rachel","",4);
        // ---> here I am guessing that one user cannot create two games?
        // Agreeing on not worrying about this due to user won't leave the game
        facade.createGame("lol","game2",4);
        facade.getGameList();
        System.out.println(divier);
        /*Invalid startGame*/
        facade.startGame("game1");

        facade.joinGame("lol", "game1", "game1");

        /*Invalid joinGame*/
        facade.joinGame("lol", "game1", "Ross");
        facade.joinGame("Phoebe", "game2", "game2");
        /*Valid register*/
        facade.register("Rachel", "Green");
        /*Valid join*/
        facade.joinGame("Rachel", "game1", "game1");
        /*Valid success*/
        facade.startGame("game1");

//
    }
}
