package plugins.FileDB;
import plugins.ISnapshotDAO;

import java.io.*;

public class FileSnapshotDAO implements ISnapshotDAO {

    @Override
    public void init() {
        ObjectToFromFile.getInstance().createFile(dbFilePath);
    }

    @Override
    public void clear() {
        ObjectToFromFile.getInstance().deleteFile(dbFilePath);
    }

    @Override
    public void updateSnapshot(Object o) {
        ObjectToFromFile.getInstance().write(dbFilePath, o);
    }


    @Override
    public Object getLatestSnapshot() {
        return ObjectToFromFile.getInstance().read(dbFilePath);
    }
}
