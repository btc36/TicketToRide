package plugins.FileDB;

import plugins.*;

public class FilePlugin implements IDBPlugin {

    private ISnapshotDAO snapshotDao;
    private IDeltaDAO deltaDao;

    public FilePlugin() {
        snapshotDao = new FileSnapshotDAO();
        deltaDao = new FileDeltaDAO();
    }

    @Override
    public IDeltaDAO getDeltaDAO() {
        return deltaDao;
    }

    @Override
    public ISnapshotDAO getSnapshotDAO() {
        return snapshotDao;
    }
}
