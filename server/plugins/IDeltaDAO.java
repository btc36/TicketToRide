package plugins;

public interface IDeltaDAO {
    String dbFilePath = "delta.db";

    public void init();
    public void clear();
    public void addDelta(Object object);
    public Object getDelta();
}
