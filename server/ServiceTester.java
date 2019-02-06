public class ServiceTester
{
    public static void main(String[] args)
    {
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

    }
}
