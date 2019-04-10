package plugins;

public interface IDeltaDAO {
    String dbFilePath = "delta.db";

    public void clear();
    public void addDelta(Object object);
    public IDeltaDAO getDelta();
}
