package plugins;

public interface ISnapshotDAO {
    String dbFilePath = "snapshot.db";

    public void init();
    public void clear();
    public void updateSnapshot(Object object);
    public ISnapshotDAO getLatestSnapshot();
}
