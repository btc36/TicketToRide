package plugins.FileDB;

import plugins.IDeltaDAO;

public class FileDeltaDAO implements IDeltaDAO {

    @Override
    public void init() {
        ObjectToFromFile.getInstance().createFile(dbFilePath);
    }

    @Override
    public void clear() {
        ObjectToFromFile.getInstance().deleteFile(dbFilePath);
    }

    @Override
    public void addDelta(Object o) {
        ObjectToFromFile.getInstance().write(dbFilePath, o);
    }

    @Override
    public Object[] getAllDelta() {
        return new Object[0];
    }
}
