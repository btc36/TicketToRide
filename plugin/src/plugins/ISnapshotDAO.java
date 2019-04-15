package plugins;

public interface ISnapshotDAO {
    String dbFilePath = "snapshot.db";

    void init();
    void clear();
    void updateSnapshot(Object object);
    Object getLatestSnapshot();
}
