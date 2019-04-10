package plugins;

public interface IDBPlugin {
   ISnapshotDAO snapshot;
   IDeltaDAO delta;

    public IDeltaDAO getDeltaDAO();

    public ISnapshotDAO getSnapshotDAO();

}
