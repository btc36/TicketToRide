package plugins;

public interface IDBPlugin {
   ISnapshotDAO snapshot = null;
   IDeltaDAO delta = null;

    public IDeltaDAO getDeltaDAO();

    public ISnapshotDAO getSnapshotDAO();

}
