package server;

import command.GenericCommand;
import model.ServerModel;
import plugins.IDeltaDAO;
import plugins.ISnapshotDAO;

public class GamePersister {

    private int maxDeltas;
    private int currentDeltas;
    private IDeltaDAO deltaDao;
    private ISnapshotDAO snapshotDao;

    private static GamePersister instance;

    public static GamePersister GetInstance() {
        if (instance == null) {
            instance = new GamePersister();
        }
        return instance;
    }

    private GamePersister() {
        this.maxDeltas = 0;
        this.currentDeltas = 0;
    }

    public void SetMaxDeltas(int maxDeltas) {
        this.maxDeltas = maxDeltas;
    }

    public void SetDeltaDao(IDeltaDAO dao) {
        this.deltaDao = dao;
    }

    public void SetSnapshotDao(ISnapshotDAO dao) {
        this.snapshotDao = dao;
    }

    public void SaveCommand(GenericCommand command) {
        // TODO: Save the command in the database
        currentDeltas++;
        if (currentDeltas > maxDeltas) {
            currentDeltas = 0;
            // TODO: Save a new snapshot of ServerModel in the database
        }
    }

    public void ClearDatabase() {
        // TODO: Clear the deltas from the database
        // TODO: Clear the snapshots from the database
    }

    public ServerModel LoadDatabase() {
        this.deltaDao.init();
        this.snapshotDao.init();
        // TODO: Load the most recent snapshot from the database
        // TODO: Return null if there is no snapshot in the database
        // TODO: Cast it to ServerModel
        // TODO: Load the most recent deltas from the database
        // TODO: Run them on top of the ServerModel
        return null;
    }
}
