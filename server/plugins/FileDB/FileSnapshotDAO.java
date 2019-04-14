package plugins.FileDB;
import plugins.ISnapshotDAO;

import java.io.*;

public class FileSnapshotDAO implements ISnapshotDAO {
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
    public void updateSnapshot(Object o) {
        this.clear();
        fileHandler.write(o);
    }


    @Override
    public Object getLatestSnapshot() {
        return fileHandler.read().get(0);
    }
}
