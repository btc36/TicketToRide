package plugins.FileDB;
import plugins.ISnapshotDAO;

import java.io.*;

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
        ObjectOutputStream os;
        FileOutputStream f;
        try {
            f = new FileOutputStream(new File(dbFilePath));
            os = new ObjectOutputStream(f);
            os.writeObject(object);
            os.close();
            f.close();
        } catch (FileNotFoundException e) {
            System.out.println("File not found");
        } catch (
        IOException e) {
            System.out.println("Error initializing stream " + e.toString());
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }


    @Override
    public Object getLatestSnapshot() {
        Object o = null;
        try {
            FileInputStream fi = new FileInputStream(new File(dbFilePath));
            ObjectInputStream oi = new ObjectInputStream(fi);
            // Read objects
            //model.ServerModel servermodel1 = (model.ServerModel) oi.readObject();
            o = oi.readObject();
            oi.close();
            fi.close();
        } catch (FileNotFoundException e) {
            System.out.println("File not found");
        } catch (
                IOException e) {
            System.out.println("Error initializing stream " + e.toString());
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return o;
    }
}
