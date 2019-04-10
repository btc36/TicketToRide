package plugins;

public interface ISnapshotDAO {
    String dbFilePath = "database.db";

    public void clear();
    public void updateSnapshot();
    public ISnapshotDAO getLatestSnapshot();
}
