package server;

import command.GenericCommand;

import java.util.ArrayList;
import java.util.List;

public class GameFacade extends Facade
{
    public List<GenericCommand> drawDestinationCardCommand()
    {
        List<GenericCommand> commandsForClient = new ArrayList<>();
        GenericCommand command;

        return commandsForClient;
    }
    public List<GenericCommand> discardDestinationCardCommand()
    {
        List<GenericCommand> commandsForClient = new ArrayList<>();
        GenericCommand command;

        return commandsForClient;
    }
}
