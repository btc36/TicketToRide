package plugins;

public interface IDeltaDAO {
    String dbFilePath = "delta.db";

    public void clear();
    public void addDelta();
    public IDeltaDAO getDelta();
}
