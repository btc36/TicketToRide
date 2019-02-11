package command;

// Command interface

import java.util.List;

public interface CommandInterface {
    List<GenericCommand> execute();
}