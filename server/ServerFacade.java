import model.LobbyGameModel;
import model.PlayerModel;
import model.ServerModel;

public class ServerFacade
{
    public void login(String username, String password)
    {

    }
    public void register(String username, String password)
    {
        PlayerModel player = new PlayerModel(username, password);
        if(player.isValid())
            ServerModel.getInstance().registerPlayer(player);

    }
    public void createGame(PlayerModel host, String gameID)
    {
        LobbyGameModel game = new LobbyGameModel(host);
        //return gameID;
    }
    public void joinGame(PlayerModel player, String gameID)
    {
        LobbyGameModel game = ServerModel.getInstance().getGameByID(gameID);
        game.addPlayer(player);
    }
    public void startGame(String gameID)
    {
        LobbyGameModel game = ServerModel.getInstance().getGameByID(gameID);
        game.startGame();
    }
    public void getGameList()
    {
        ServerModel.getInstance().getAllGames();
    }
}
