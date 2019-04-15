package plugins.FileDB;

import plugins.IDeltaDAO;

public class FileDeltaDAO implements IDeltaDAO {
    ObjectToFromFile fileHandler;

    @Override
    public void init() {
        fileHandler = new ObjectToFromFile(dbFilePath);
    }

    @Override
    public void clear() {
        fileHandler.deleteFile();
    }

    @Override
    public void addDelta(Object o) {
        fileHandler.write(o);
    }

    @Override
    public Object[] getAllDelta() {
        return fileHandler.read().toArray();
    }
}
