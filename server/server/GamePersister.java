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
        deltaDao.addDelta(command);
        currentDeltas++;
        if (currentDeltas > maxDeltas) {
            currentDeltas = 0;
            snapshotDao.updateSnapshot(ServerModel.getInstance());
            deltaDao.clear();
        }
    }

    public void ClearDatabase() {
        deltaDao.clear();
        snapshotDao.clear();
    }

    public ServerModel LoadDatabase() {
        deltaDao.init();
        snapshotDao.init();
        ServerModel loaded = (ServerModel) snapshotDao.getLatestSnapshot();
        if (loaded == null) {
            System.out.println("The snapshot loaded from the database could not be cast to a ServerModel object.");
            return null;
        }
        GenericCommand[] commands = (GenericCommand[]) deltaDao.getAllDelta();
        if (loaded == null) {
            System.out.println("The deltas loaded from the database could not be cast to a GenericCommand array.");
            return null;
        }
        ServerModel.setInstance(loaded);
        for (GenericCommand command : commands) {
            command.execute();
        }
        return ServerModel.getInstance();
    }
}
