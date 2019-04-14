package plugins.FileDB;

import plugins.IDeltaDAO;

public class FileDeltaDAO implements IDeltaDAO {
    ObjectToFromFile fileHandler;

    public void FileSnapshotDAO() {
        fileHandler = new ObjectToFromFile(dbFilePath);
    }

    @Override
    public void init() {
        fileHandler.createFile();
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

        return new Object[0];
    }
}
