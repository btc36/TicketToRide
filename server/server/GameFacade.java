package server;

import java.lang.reflect.Array;
import java.util.*;

import command.GenericCommand;
import model.*;
import model.LobbyGameModel;
import static model.LobbyGameModel.State.*;


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
    private final String updateScore = "updateScore";
    private final String lastRound = "lastRound";
    private final String whoseTurn = "whoseTurn";
    private final int LASTCARNUM = 2;

    /**
     * client receives 3 destination cards that user can choose from
     * @param gameID which game is it on
     * @param username which player is performing the action
     * @return List that contains three Destination Card
     */
    public List<GenericCommand> potentialDestinationCard(String gameID, String username)
    {
        List<GenericCommand> commandsForClient = new ArrayList<>();
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
                cards.addAll(destDeck.pollThree());
                PlayerModel p = getPlayer(username);
                p.addDestinationards(cards);
                message = sMessage + potential;
                GenericCommand command = commandForDestination(potential, true, message, gameID, username, cards, -1);
                commandsForClient.add(command);
                commandsForClient.add(updateScoreCommand(gameID));
                System.out.println(message);
                return commandsForClient;
            }
        }

        System.out.println(message);
        commandsForClient.add(failureCommand(message, potential));
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
            command = commandForDestination(draw, status, message, gameID, username, cards, -1);
            commandsForClient.add(command);
            commandsForClient.add(updateScoreCommand(gameID));
        }
        else
        {
            commandsForClient.add(failureCommand(message, draw));
        }

        System.out.println(message);
        return commandsForClient;
    }

    /** User relinquishes a card and gets added to the server model
     * @param gameID which game is it in
     * @param username which user is performing the action
     * @return list of command that contains
     */
    public List<GenericCommand> discardDestinationCard(String gameID, String username, String city1, String city2, Integer pointValue)
    {
        List<GenericCommand> commandsForClient = new ArrayList<>();
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

            message = sMessage + discard;
            command = commandForDestination(discard, true, message, gameID, username, null, kept);
            commandsForClient.add(command);
            commandsForClient.add(updateScoreCommand(gameID));
        }
        else
        {
            commandsForClient.add(failureCommand(message, discard));
        }

        System.out.println(message);

        return commandsForClient;
    }

    /**
     * draw TrainCard from the deck or faceup
     * @param gameID
     * @param username
     * @param index -1 if from the deck, 0-4 if for faceup
     * @return Command that contains user, traincard, and faceup
     */
    public List<GenericCommand> drawTrainCard(String gameID, String username, Integer index)
    {
        System.out.println("I DREW A TRAIN CARD\n");
        String message = checkInput(gameID, username);
        List<TrainCard> faceUpCards = new ArrayList<>();
        List<GenericCommand> commandsForClient = new ArrayList<>();

        if(index >= 5 || index < -1)
            message += "invalid card index\n";
        if(message.isEmpty())
        {
            message = sMessage + drawTrain;
            LobbyGameModel game = ServerModel.getInstance().getGameByID(gameID);

            TrainCard card;
            if(index == -1)
                card = game.drawTrainCardDeck();
            else
                card = game.drawTrainCardFace(index);

            faceUpCards.addAll(game.getFaceUpCards().getFaceUpCards());
            GenericCommand command = new GenericCommand(
                    gameClass, drawTrain,
                    new String[]{_paramTypeBoolean, _paramTypeString, _paramTypeString, _paramTypeString, _paramTrainCard, _paramTypeList},
                    new Object[]{true, message, gameID, username, card, faceUpCards}
            );
            commandsForClient.add(command);
            commandsForClient.add(updateScoreCommand(gameID));
        }
        else
        {
            failureCommand(message, drawTrain);
        }

        System.out.println(message);
        return commandsForClient;
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
     * claims routes
     * under the hood, also checks any destination is complete
     * update resources and player info
     * @param gameID
     * @param username
     * @param cityOne
     * @param cityTwo
     * @param routeColor
     * @param length
     * @param selectionColor
     * @return what do you want
     */
    public List<GenericCommand> claimRoute(String gameID, String username, String cityOne, String cityTwo, String routeColor, Integer length, String selectionColor)
    {
        List<GenericCommand> commandsForClient = new ArrayList<>();
        String message = checkInput(gameID, username);
        message += checkTrainColors(selectionColor);
        
        if(message.isEmpty())
        {
            Route temp = new Route(cityOne, cityTwo, length, routeColor);
            LobbyGameModel game = getGameByID(gameID);
            Route route = game.getMatchingRoute(temp);
            PlayerModel p = getPlayer(username);

            if(route == null)
                message += "error : invalid route\n";
            else if(game.isClaimed(route))
                message += "error : route is ALREADY claimed\n";
            else if(p == null)
                message += "error : invalid player\n";
            else if(!p.sufficientResource(route, selectionColor))
                message += "error : insufficient resource\n";
            else
            {
                game.claimRoute(route, username, selectionColor);
                message = sMessage + claim;
                GenericCommand command = new GenericCommand(
                        _gameClassName, claim,
                        new String[]{_paramTypeBoolean, _paramTypeString, _paramTypeString, _paramTypeString , _paramRoute},
                        new Object[]{ true, message, gameID, username, route});

                commandsForClient.add(command);
                commandsForClient.add(updateScoreCommand(gameID));
                System.out.println(message);

                return commandsForClient;
            }
        }

        System.out.println(message);
        commandsForClient.add(failureCommand(message, claim));
        return commandsForClient;
    }

    /**
     * WTF?
     * @param gameID
     * @return list that contains routes?
     */
    public List<GenericCommand> getRoutes(String gameID)
    {
        String username = "WTF DO YOU WANT\n";
        List<GenericCommand> commandsForClient = new ArrayList<>();
        String message = checkGame(gameID);
        if(message.isEmpty())
        {
            message = sMessage + getRoute;
            LobbyGameModel game = getGameByID(gameID);
            List<Route> claimedRoutes = game.getClaimedRoutes();
            List<Route> unclaimedRoutes = game.getUnClaimedRoutes();
            //PlayerModel player = game.getPlayer(username);

            GenericCommand command = new GenericCommand(
                    gameClass, getRoute,
                    new String[]{_paramTypeBoolean, _paramTypeString, _paramTypeString, _paramTypeList, _paramTypeList},
                    new Object[]{true, message, gameID, claimedRoutes, unclaimedRoutes}
            );
            commandsForClient.add(command);
        }
        else
            commandsForClient.add(failureCommand(message, getRoute));

        return commandsForClient;
    }

    /**
     * announce that it's last round
     * @param gameID for which game
     * @return command for lastRound
     */
    public GenericCommand lastRound(String gameID)
    {
        // TESTING CODE//
        getGameByID(gameID).setState(LASTROUND);
        ///////

        GenericCommand command = new GenericCommand(
                gameClass, lastRound,
                new String[]{_paramTypeBoolean, _paramTypeString, _paramTypeString},
                new Object[]{true, sMessage + "lastRound", gameID}
        );
        commandCheck(command);
        return command;
    }


    /**
     * end the turn for a single client
     * @param gameID for which game
     * @param username for which user
     * @return List that contains currenTurn or currentTurn + lastRound
     *      * or endGame (which means no more turns)
     *      * updateScore for all three
     */
    public List<GenericCommand> endTurn(String gameID, String username)
    {
        List<GenericCommand> commandsForClient = new ArrayList<>();
        String message = checkInput(gameID, username);
        if(message.isEmpty())
        {
            PlayerModel p = getPlayer(username);
            LobbyGameModel game = getGameByID(gameID);
            game.endTurn(); // turn change in game and the player

            if(p.getTrainNum() <= LASTCARNUM)
                game.setState(LASTROUND);
            else if(game.getState() == LASTROUND)
                game.setState(FINISHED);

            commandsForClient.addAll(roundCheck(game));
        }
        else commandsForClient.add(failureCommand(message, endTurn));

        return commandsForClient;
    }

    /**
     * Gets whose turn is and latest info for the clients
     * @param gameID which game
     * @return List that contains currenTurn or currentTurn + lastRound
     * or endGame (which means no more turns)
     * updateScore for all three
     */
    public List<GenericCommand> whoseTurn(String gameID)
    {
        List<GenericCommand> commandsForClient = new ArrayList<>();
        String message = checkGame(gameID);
        if(message.isEmpty())
        {
            LobbyGameModel game = getGameByID(gameID);
            commandsForClient.addAll(roundCheck(game));
        }
        else
        {
            commandsForClient.add(failureCommand(message, whoseTurn));
        }
        return commandsForClient;
    }

    private List<GenericCommand> endGame(String gameID)
    {
        List<GenericCommand> commandsForClient = new ArrayList<>();
        String message = checkGame(gameID);

        if(message.isEmpty())
        {
            LobbyGameModel game = getGameByID(gameID);
            String winner = "Winner winner chicken dinner\n";

            if(game.getWinner() == null) // we don't want it to find longest every time
                game.endGame();

            message = sMessage + endGame;
            winner = game.getWinner().getUsername();
            GenericCommand command = new GenericCommand(
                    gameClass, endGame,
                    new String[]{_paramTypeBoolean, _paramTypeString, _paramTypeString, _paramTypeString},
                    new Object[]{true, message, gameID, winner}
            );

            commandCheck(command);
            commandsForClient.add(command);
            commandsForClient.add(updateScoreCommand(gameID));
        }
        else commandsForClient.add(failureCommand(message, endGame));


        System.out.println(endGame);

        return commandsForClient;
    }

    private List<GenericCommand> roundCheck(LobbyGameModel game)
    {
        List<GenericCommand> commandsForClient = new ArrayList<>();
        String gameID = game.getGameID();
        if(game.getState() == FINISHED) // Time to announce game is over
        {
            commandsForClient.addAll(endGame(gameID));
        }
        else
        {
            commandsForClient.add(currentTurn(gameID, game.getTurn()));

            if(game.getState() == LASTROUND) // Time to announce last Round
                commandsForClient.add(lastRound(gameID));
        }

        commandsForClient.add(updateScoreCommand(game.getGameID()));

        System.out.println(sMessage + " roundCheck");
        return commandsForClient;
    }

    // used for update contains latest scores and players
    public GenericCommand updateScoreCommand(String gameID)
    {
        LobbyGameModel game = getGameByID(gameID);
        List<Integer> scores = game.getScores();
        List<PlayerModel> players = game.getPlayerList().getPlayerList();
        List<TrainCard> faceupCards = game.getFaceUpCards().getFaceUpCards();
        GenericCommand command = new GenericCommand(
                gameClass, updateScore,
                new String[]{_paramTypeBoolean, _paramTypeString, _paramTypeString, _paramTypeList, _paramTypeList, _paramTypeList},
                new Object[]{true, sMessage, gameID, scores, players, faceupCards}
        );
        commandCheck(command);
        System.out.println(sMessage + " updateScore");
        return command;
    }

    private GenericCommand currentTurn(String gameID, String username)
    {
        GenericCommand command = new GenericCommand(
                gameClass, currentTurn,
                new String[]{_paramTypeBoolean, _paramTypeString, _paramTypeString, _paramTypeString},
                new Object[]{true, sMessage + "currentTurn", gameID, username}
        );
        return command;
    }

    private String checkTrainColors(String color)
    {
        List<String> correctColors = Arrays.asList(new String[]{"pink","white","blue","yellow","orange","black","red","green","rainbow"});
        if(!correctColors.contains(color))
            return "Incorrect Color";

        return "";
    }

}
