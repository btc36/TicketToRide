package plugins;

public interface IDBPlugin {
   ISnapshotDAO snapshot = null;
   IDeltaDAO delta = null;

   IDeltaDAO getDeltaDAO();
   ISnapshotDAO getSnapshotDAO();

}
