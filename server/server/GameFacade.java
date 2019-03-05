package server;

import command.GenericCommand;
import model.*;

import java.util.ArrayList;
import java.util.List;



public class GameFacade extends Facade
{
    private final String potential = "potentialDestinationCard";
    private final String draw = "drawDestinationCard";
    private final String discard = "discardDestinationCard";

    public GameFacade()
    {

    }
    public List<GenericCommand> potentialDestinationCard(String gameID)
    {
        List<GenericCommand> commandsForClient = new ArrayList<>();
        boolean status = false;
        String message = "";
        List<DestinationCard> cards = new ArrayList<>();
        if(!isInputValid(gameID)) { message = "gameID is invalid";}
        else if(gameExists(gameID)) { message = "game doesn't exist";}
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
        GenericCommand command = new GenericCommand(
                _className, potential,
                new String[]{_paramTypeBoolean, _paramTypeString,_paramTypeList},
                new Object[]{status, message, cards}
                //TODO: DO YOU NEED GAME ID?
        );
        commandsForClient.add(command);
        return commandsForClient;
    }
    public List<GenericCommand> drawDestinationCard(String gameID)
    {
        List<GenericCommand> commandsForClient = new ArrayList<>();
        boolean status = false;
        String message;
        GenericCommand command;

        List<DestinationCard> cards = new ArrayList<>();
        if(!isInputValid(gameID) || !gameExists(gameID)) { message = "invalid gameID"; }
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
        command = new GenericCommand(
                _className, draw,
                new String[]{_paramTypeBoolean, _paramTypeString,_paramTypeString},
                //new String[]{_paramTypeBoolean, _paramTypeString,_paramTypeList},
                new Object[]{status, message, cards}
        );
        commandsForClient.add(command);
        return commandsForClient;
    }

    /**
     * @param gameID and cards
     * discard in the perspective of player
     * @return list of command that contains
     */
    public List<GenericCommand> discardDestinationCardCommand(String gameID, List<DestinationCard> cards)
    {
        List<GenericCommand> commandsForClient = new ArrayList<>();
        boolean status = false;
        String message = "";
        GenericCommand command;

        if(!isInputValid(gameID)) { message = "gameID is invalid";}
        else if(gameExists(gameID)) { message = "game doesn't exist";}
        else
        {
            LobbyGameModel game = getGameByID(gameID);
            for(DestinationCard card : cards)
            {
                game.addDestCard(card);
            }
            message = "success : " + discard;
            //TODO: what do you want it to return?
        }

        command = new GenericCommand(
                _className, discard,
                new String[]{_paramTypeBoolean, _paramTypeString,_paramTypeString},
                //new String[]{_paramTypeBoolean, _paramTypeString,_paramTypeList},
                new Object[]{status, message, cards}
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
}
