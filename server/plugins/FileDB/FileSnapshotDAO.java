package plugins.FileDB;
import plugins.ISnapshotDAO;

import java.io.File;

public class FileSnapshotDAO implements ISnapshotDAO {

    @Override
    public void init() {
        File file = new File(dbFilePath);
        if(!file.canWrite()) {
            System.out.println("can not create file.\n");
        }
    }

    @Override
    public void clear() {
        File file = new File(dbFilePath);
        if(file.delete())
        {
            System.out.println("File deleted successfully");
        }
        else
        {
            System.out.println("Failed to delete the file");
        }
    }

    @Override
    public void updateSnapshot(Object object) {
        //File file = new File(dbFilePath);
        //os.writeObject(model.ServerModel.getInstance());

    }


    @Override
    public Object getLatestSnapshot() {
        return null;
    }
}