package server;

import command.GenericCommand;
import model.*;
import model.LobbyGameModel;

import java.util.ArrayList;
import java.util.List;



public class GameFacade extends Facade
{

    private final String potential = "potentialDestinationCard";
    private final String draw = "drawDestinationCard";
    private final String discard = "discardDestinationCard";
    private final String trains = "getTrainCard";

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
        String message = "";
        List<DestinationCard> cards = new ArrayList<>();
        if(!isInputValid(gameID)) { message = "gameID is invalid\n";}
        else if(!isInputValid(username)) { message = "username is invalid\n"; }
        else if(!playerExists(username)) { message = "user does not exist\n"; }
        else if(!gameExists(gameID)) { message = "game doesn't exist\n";}
        else if(!isGameStarted(gameID)) { message = "game did not start\n"; }
        else
        {
            Deck destDeck = getDestinationDeck(gameID);
            if(destDeck.isEmpty())
            {
                message = "deck empty";
            }
            else
            {
                status = true;
                cards.addAll(destDeck.getThree());
                message = "success : " + potential;
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
        String message;
        GenericCommand command;
        int kept = 0;
        List<DestinationCard> cards = new ArrayList<>();
        if(!isInputValid(gameID) || !gameExists(gameID)) { message = "invalid gameID"; }
        else if(!isInputValid(username)) { message = "username is invalid\n"; }
        else if(!playerExists(username)) { message = "user does not exist\n"; }
        else if(!isGameStarted(gameID)) { message = "game did not start"; }
        else
        {
            Deck destDeck = getDestinationDeck(gameID);

            if(destDeck.isEmpty())
            {
                message = "empty deck";
            }
            else
            {
                cards.add((DestinationCard) destDeck.poll());
                status = true;
                message = "success : " + draw;
            }
        }
        System.out.println(message);
        command = commandForDestination(draw, status, message, gameID, username, cards, kept);
        commandsForClient.add(command);
        return commandsForClient;
    }

    /**
     * @param gameID which game is it in
     * @param username which user is performing the action
     * @param cards to be discarded
     * @return list of command that contains
     */
    public List<GenericCommand> discardDestinationCardCommand(String gameID, String username, List<DestinationCard> cards)
    {
        List<GenericCommand> commandsForClient = new ArrayList<>();
        boolean status = false;
        String message = "";
        GenericCommand command;

        if(!isInputValid(gameID)) { message = "gameID is invalid";}
        else if(!gameExists(gameID)) { message = "game doesn't exist";}
        else if(!isGameStarted(gameID)) { message = "game did not start"; }
        else
        {
            LobbyGameModel game = getGameByID(gameID);

            for(DestinationCard card : cards)
                game.addDestCard(card);

            cards.clear();

            status  = true;
            message = "success : " + discard;
        }

        System.out.println(message);
        command = commandForDestination(discard, status, message, gameID, username, cards, -1);
        commandsForClient.add(command);
        return commandsForClient;
    }

    public List<GenericCommand> getMultipleTrainCards(String gameID, String username, int count)
    {
        List<GenericCommand> commandsForClient = new ArrayList<>();
        boolean status = false;
        String message;
        GenericCommand command;
        List<TrainCard> cards = new ArrayList<>();
        if(!isInputValid(gameID) || !gameExists(gameID)) { message = "invalid gameID"; }
        else if(!isInputValid(username)) { message = "username is invalid\n"; }
        else if(!playerExists(username)) { message = "user does not exist\n"; }
        else if(!isGameStarted(gameID)) { message = "game did not start"; }
        else
        {
            Deck trainDeck = getTrainDeck(gameID);

            if(trainDeck.isEmpty())
            {
                message = "empty deck";
            }
            else
            {
                cards.addAll(trainDeck.getThisMany(count));
                status = true;
                message = "success : " + trains;
            }
        }

        System.out.println(message);
        command = commandForTrain(trains, status, message, gameID, username, cards);
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
        if(kept != -1)
        {
             command = new GenericCommand(
                    _className, method,
                    new String[]{_paramTypeBoolean, _paramTypeString, _paramTypeString, _paramTypeString , _paramTypeList},
                    new Object[]{ status, message, gameID, username, cards }
            );
        }
        else
        {
            command = new GenericCommand(
                    _className, method,
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
                    _className, method,
                    new String[]{_paramTypeBoolean, _paramTypeString, _paramTypeString, _paramTypeString , _paramTypeList, _paramTypeInteger},
                    new Object[]{ status, message, gameID, username, cards, cards.size() }
            );

        commandCheck(command);
        return command;
    }
}
