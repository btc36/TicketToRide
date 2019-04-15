package plugins;

public class SQLPlugin implements IDBPlugin {

    private ISnapshotDAO snapshotDao;
    private IDeltaDAO deltaDao;

    public SQLPlugin() {
        snapshotDao = new SQLSnapshotDAO();
        deltaDao = new SQLDeltaDAO();
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
