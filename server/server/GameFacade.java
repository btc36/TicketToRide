package server;

import command.GenericCommand;
import model.Deck;
import model.DestinationCard;
import model.LobbyGameModel;
import model.ServerModel;

import java.util.ArrayList;
import java.util.List;

public class GameFacade extends Facade
{
    public List<GenericCommand> drawDestinationCardCommand()
    {
        List<GenericCommand> commandsForClient = new ArrayList<>();
        boolean status = false;
        String message = "";
        GenericCommand command;
        DestinationCard card;


        List<DestinationCard> cards = new ArrayList<>();


        command = new GenericCommand(
                _className, "startGame",
                new String[]{_paramTypeBoolean, _paramTypeString,_paramTypeString},
                //new String[]{_paramTypeBoolean, _paramTypeString,_paramTypeList},
                new Object[]{status, message, cards}
        );
        commandsForClient.add(command);
        return commandsForClient;
    }

    /**
     * @param gameID and cards
     *
     * @return list of command that contains
     */
    public List<GenericCommand> discardDestinationCardCommand(String gameID, List<DestinationCard> cards)
    {
        List<GenericCommand> commandsForClient = new ArrayList<>();
        boolean status = false;
        String message = "";
        GenericCommand command;
        DestinationCard card = new DestinationCard("", "", 4);

        Deck deck = getDestinationDeck("");
        
//        command = new GenericCommand(
//                _className, "startGame",
//                new String[]{_paramTypeBoolean, _paramTypeString,_paramTypeString},
//                //new String[]{_paramTypeBoolean, _paramTypeString,_paramTypeList},
//                new Object[]{status, message, cards}
//        );
//        commandsForClient.add(command);
        return commandsForClient;
    }

    private Deck getDestinationDeck(String gameID)
    {
        LobbyGameModel game = getGameByID(gameID);
        return game == null ? null : game.getDestinationDeck();
    }
    private Deck getTrainDeck(String gameID)
    {
        LobbyGameModel game = getGameByID(gameID);
        return game == null ? null : game.getTrainDeck();
    }
}
