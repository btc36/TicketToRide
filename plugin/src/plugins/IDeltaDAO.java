package plugins;

public interface IDeltaDAO {
    String dbFilePath = "delta.db";

    void init();
    void clear();
    void addDelta(Object object);
    Object[] getAllDelta();
}
