package server;

import command.GenericCommand;
import model.*;
import model.LobbyGameModel;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;


public class GameFacade extends Facade
{


    private final String potential = "potentialDestinationCard";
    private final String draw = "drawDestinationCard";
    private final String drawTrain = "drawTrainCard";
    private final String discard = "updateNumDestinationCards";
    private final String trains = "getTrainCard";
    private final String claim = "claimRoute";
    private final String getRoute = "getRoute";
    private final String endGame = "endGame";
    private final String endTurn = "endTurn";
    private final String currentTurn = "currentTurn";
    private final String getHistory = "receiveHistory";
    private final String sMessage = "success : ";
    private final String gameClass = "IngameExternalClientFacade";

    /**
     *
     * @param gameID which game is it on
     * @param username which player is performing the action
     * @return List that contains three Destination Card
     */
    public List<GenericCommand> potentialDestinationCard(String gameID, String username)
    {
        List<GenericCommand> commandsForClient = new ArrayList<>();
        boolean status = false;
        List<DestinationCard> cards = new ArrayList<>();
        String message = checkInput(gameID, username);
        if(message.isEmpty())
        {
            Deck destDeck = getDestinationDeck(gameID);

            if(destDeck == null || destDeck.isEmpty())
            {
                message = "deck empty";
            }
            else
            {
                status = true;
                cards.addAll(destDeck.pollThree());
                PlayerModel p = getPlayer(username);
                p.addDestinationards(cards);
                message = sMessage + potential;
            }
        }

        System.out.println(message);
        GenericCommand command = commandForDestination(potential, status, message, gameID, username, cards, -1);
        commandsForClient.add(command);
        return commandsForClient;
    }

    /**
     *
     * @param gameID which game is it on
     * @param username which player is performing the action
     * @return List that contains one Destination Card and etc
     */
    public List<GenericCommand> drawDestinationCard(String gameID, String username)
    {
        List<GenericCommand> commandsForClient = new ArrayList<>();
        boolean status = false;
        GenericCommand command;
        List<DestinationCard> cards = new ArrayList<>();
        String message = checkInput(gameID, username);
        if(message.isEmpty())
        {
            Deck destDeck = getDestinationDeck(gameID);

            if(destDeck == null || destDeck.isEmpty()) { message = "empty deck"; }
            else
            {
                cards.add((DestinationCard) destDeck.poll());
                status = true;
                message = sMessage + draw;
            }
        }
        System.out.println(message);
        command = commandForDestination(draw, status, message, gameID, username, cards, -1);
        commandsForClient.add(command);
        return commandsForClient;
    }

    /**
     * @param gameID which game is it in
     * @param username which user is performing the action
     * @return list of command that contains
     */
    public List<GenericCommand> discardDestinationCard(String gameID, String username, String city1, String city2, Integer pointValue)
    {
        List<GenericCommand> commandsForClient = new ArrayList<>();
        boolean status = false;
        String message;
        GenericCommand command;
        int kept = 3;
        message = checkInput(gameID, username);
        if(message.isEmpty())
        {
            LobbyGameModel game = getGameByID(gameID);
            if(pointValue != -1)
            {
                PlayerModel p = getPlayer(username);
                DestinationCard card = new DestinationCard(city1, city2, pointValue);
                p.removeDestinationCard(card);
                game.getDestDeck().add(card);
                kept -= 1;
            }


            status  = true;
            message = sMessage + discard;
        }

        System.out.println(message);
        command = commandForDestination(discard, status, message, gameID, username, null, kept);
        commandsForClient.add(command);
        return commandsForClient;
    }

    public List<GenericCommand> drawTrainCard(String gameID, String username, Integer index)
    {

        String message = checkInput(gameID, username);
        List<TrainCard> result = new ArrayList<>();
        List<GenericCommand> commandsForClient = new ArrayList<>();
        boolean success = false;
        if(index >= 5 || index < -1)
            message += "invalid card index\n";
        if(message.isEmpty())
        {
            LobbyGameModel game = ServerModel.getInstance().getGameByID(gameID);

            if(index == -1)
                result.add(game.drawTrainCardDeck());
            else
                result.add(game.drawTrainCardFace(index));

            success = true;
        }

        GenericCommand command = new GenericCommand(
                gameClass, getRoute,
                new String[]{_paramTypeBoolean, _paramTypeString, _paramTypeString, _paramTypeString, _paramTypeList},
                new Object[]{success, message, gameID, username, result}
        );

        commandsForClient.add(command);
        return commandsForClient;
    }



//    public List<GenericCommand> getMultipleTrainCards(String gameID, String username, int count)
//    {
//        List<GenericCommand> commandsForClient = new ArrayList<>();
//        boolean status = false;
//        List<TrainCard> cards = new ArrayList<>();
//        String message = checkInput(gameID, username);
//        if(message.isEmpty())
//        {
//            Deck trainDeck = getTrainDeck(gameID);
//
//            if(trainDeck.isEmpty())
//            {
//                message = "empty deck";
//            }
//            else
//            {
//                cards.addAll(trainDeck.pollThisMany(count));
//                status = true;
//                message = sMessage + trains;
//            }
//        }
//
//        System.out.println(message);
//        GenericCommand command = commandForTrain(trains, status, message, gameID, username, cards);
//        commandsForClient.add(command);
//        return commandsForClient;
//    }

    public List<GenericCommand> claimRoute(String gameID, String username, String cityOne, String cityTwo, String routeColor, Integer length, List<String> colors)
    {
        boolean status = false;
        List<GenericCommand> commandsForClient = new ArrayList<>();
        String message = checkInput(gameID, username);
        Route route = null;
        if(message.isEmpty())
        {
            Route temp = new Route(cityOne, cityTwo, length, routeColor);
            LobbyGameModel game = getGameByID(gameID);
            route = game.getMatchingRoute(temp);
            if(route == null)
                message = "error : invalid route\n";
            else if(game.isClaimed(route))
                message = "error : route is ALREADY claimed\n";
            else
            {
                status = true;
                game.claimRoute(route, username, colors);
                message = sMessage + claim;
            }
        }

        GenericCommand command = new GenericCommand(
            _gameClassName, claim,
            new String[]{_paramTypeBoolean, _paramTypeString, _paramTypeString, _paramTypeString , "model.Route"},
            new Object[]{ status, message, gameID, username, route}
        );

        commandsForClient.add(command);
        return commandsForClient;
    }

    private Deck getDestinationDeck(String gameID)
    {
        LobbyGameModel game = getGameByID(gameID);
        return game == null ? null : game.getDestDeck();
    }

    private Deck getTrainDeck(String gameID)
    {
        LobbyGameModel game = getGameByID(gameID);
        return game == null ? null : game.getTrainDeck();
    }
    public List<LobbyGameModel> getGame()
    {
        return ServerModel.getInstance().getAllGames().getGameList();
    }

    private boolean isGameStarted(String gameID)
    {
        return (getGameByID(gameID).getState() == LobbyGameModel.State.ONGOING);
    }
    private GenericCommand commandForDestination(String method, boolean status, String message, String gameID, String username, List<DestinationCard> cards, int kept)
    {
        GenericCommand command;
        if(kept == -1)
        {
             command = new GenericCommand(
                    _gameClassName, method,
                    new String[]{_paramTypeBoolean, _paramTypeString, _paramTypeString, _paramTypeString , _paramTypeList},
                    new Object[]{ status, message, gameID, username, cards }
            );
        }
        else
        {
            command = new GenericCommand(
                    _gameClassName, method,
                    new String[]{_paramTypeBoolean, _paramTypeString, _paramTypeString, _paramTypeString , _paramTypeList, _paramTypeInteger},
                    new Object[]{ status, message, gameID, username, cards, kept }
            );
        }
        commandCheck(command);
        return command;
    }
    private GenericCommand commandForTrain(String method, boolean status, String message, String gameID, String username, List<TrainCard> cards)
    {
        GenericCommand command;

            command = new GenericCommand(
                    _gameClassName, method,
                    new String[]{_paramTypeBoolean, _paramTypeString, _paramTypeString, _paramTypeString , _paramTypeList, _paramTypeInteger},
                    new Object[]{ status, message, gameID, username, cards, cards.size() }
            );

        commandCheck(command);
        return command;
    }


    /**
     @param move, timestamp, username, gameID
     @return command that contains success, result message, gameID,
     and all of the chat history associated with the gameID
     */
    public List<GenericCommand> sendGameHistory(String move, String username, String gameID)
    {
        String message = checkInput(gameID, username);
        boolean success = false;
        List<GenericCommand> commandsForClient = new ArrayList<>();
        GenericCommand command;
        ChatRoom room = null;
        List<HistoryEntry> result = new ArrayList<>();

        if(message.isEmpty())
        {
            success = true;
            HistoryEntry entry = new HistoryEntry(move, username);
            ServerModel.getInstance().addHistory(gameID, entry);
            result.addAll(ServerModel.getInstance().getGameHistory(gameID)); // bad .. but... ㅈㄲ
            message = sMessage + getHistory;
        }

        command = new GenericCommand(
                _className, getHistory,
                new String[]{_paramTypeBoolean, _paramTypeString, _paramTypeString, _paramTypeList},
                new Object[]{success, message, gameID, result}
        );

        commandsForClient.add(command);

        return commandsForClient;
    }

    public List<GenericCommand> getGameHistory(String gameID)
    {
        String message = checkGame(gameID);
        boolean success = false;
        List<GenericCommand> commandsForClient = new ArrayList<>();
        GameHistory history = null;
        List<HistoryEntry> result = new ArrayList<>();

        if(message.isEmpty())
        {
            success = true;
            history = ServerModel.getInstance().getGameHistorybyID(gameID);
            result.addAll(history.getGameHistory());
            message = sMessage + getHistory;
        }

        System.out.println(message);
        GenericCommand command = new GenericCommand(
                gameClass, getHistory,
                new String[]{_paramTypeBoolean, _paramTypeString, _paramTypeString, _paramTypeList},
                new Object[]{success, message, gameID, result}
        );

        commandCheck(command);
        commandsForClient.add(command);
        return commandsForClient;
    }

    public List<GenericCommand> getRoutes(String gameID)
    {
        String username = "wtf";
        List<GenericCommand> commandsForClient = new ArrayList<>();
        List<Route> result = new ArrayList<>();
        boolean success = false;
        String message = checkGame(gameID);
        if(message.isEmpty())
        {
            success = true;
            LobbyGameModel game = getGameByID(gameID);
            PlayerModel player = game.getPlayer(username);
            result = player.getClaimedRoutes();
            message = sMessage + getRoute;
        }

        GenericCommand command = new GenericCommand(
                gameClass, getRoute,
                new String[]{_paramTypeBoolean, _paramTypeString, _paramTypeString, _paramTypeList},
                new Object[]{success, message, gameID, result}
        );

        return commandsForClient;
    }

    public List<GenericCommand> lastRound(String gameID)
    {
        List<GenericCommand> commandsForClient = new ArrayList<>();

        // ???
        // ???
        return commandsForClient;
    }

    public List<GenericCommand> endGame(String gameID)
    {
        List<GenericCommand> commandsForClient = new ArrayList<>();
        boolean success = false;
        String message = checkGame(gameID);
        String winner = "Winner winner chicken dinner";
        List<PlayerModel> result = new ArrayList<>();
        if(message.isEmpty())
        {
            LobbyGameModel game = getGameByID(gameID);
            game.endGame();
            success = true;
            message = sMessage + endGame;
            winner = game.getWinner().getUsername();
        }

        GenericCommand command = new GenericCommand(
                gameClass, endGame,
                new String[]{_paramTypeBoolean, _paramTypeString, _paramTypeString, _paramTypeList, _paramTypeString},
                new Object[]{success, message, gameID, result, winner}
        );

        commandCheck(command);
        commandsForClient.add(command);
        return commandsForClient;
    }

    public List<GenericCommand> endTurn(String gameID, String username)
    {
        boolean success = false;
        List<GenericCommand> commandsForClient = new ArrayList<>();

        String message = checkInput(gameID, username);
        if(message.isEmpty())
        {
            LobbyGameModel game = getGameByID(gameID);
            game.endTurn();
            success = true;
            message = sMessage + endTurn;
        }

        GenericCommand command = new GenericCommand(
                gameClass, endTurn,
                new String[]{_paramTypeBoolean, _paramTypeString, _paramTypeString},
                new Object[]{success, message, gameID}
        );

        commandCheck(command);
        commandsForClient.add(command);
        commandsForClient.addAll(whoseTurn(gameID));
        return commandsForClient;
    }

    public List<GenericCommand> whoseTurn(String gameID)
    {
        boolean success = false;
        List<GenericCommand> commandsForClient = new ArrayList<>();

        String message = checkGame(gameID);
        String username = "wtf";
        if(message.isEmpty())
        {
            LobbyGameModel game = getGameByID(gameID);
            username = game.getTurn();
            message = sMessage + currentTurn;
        }

        GenericCommand command = new GenericCommand(
                gameClass, currentTurn,
                new String[]{_paramTypeBoolean, _paramTypeString, _paramTypeString, _paramTypeString},
                new Object[]{success, message, gameID, username}
        );

        commandCheck(command);
        commandsForClient.add(command);
        return commandsForClient;
    }

    private String checkInput(String gameID, String username)
    {
        String message = "";
        message += checkPlayer(username);
        message += checkGame(gameID);
        return message;
    }

    private String checkGame(String gameID)
    {
        String message = "";
        if(!isInputValid(gameID) || !gameExists(gameID)) { message += "invalid gameID"; }
        else if(!isGameStarted(gameID)) { message += "game did not start"; }
        return message;
    }


    private String checkPlayer(String username)
    {
        String message = "";
        if(!isInputValid(username)) { message += "username is invalid\n"; }
        if(!playerExists(username)) { message += "user does not exist\n"; }
        return message;
    }
}
