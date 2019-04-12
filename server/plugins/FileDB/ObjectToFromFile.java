package plugins.FileDB;


import java.io.*;

//singleton
public class ObjectToFromFile {
    private static ObjectToFromFile single_instance = null;

    // private constructor restricted to this class itself
    private ObjectToFromFile() {    }

    // static method to create instance of Singleton class
    public static ObjectToFromFile getInstance()
    {
        if (single_instance == null)
            single_instance = new ObjectToFromFile();

        return single_instance;
    }

    public Boolean write(String filepath, Object obj) {
        ObjectOutputStream os;
        FileOutputStream f;
        try {
            f = new FileOutputStream(new File(filepath));
            os = new ObjectOutputStream(f);
            os.writeObject(obj);
            os.close();
            f.close();
            return true;
        } catch (FileNotFoundException e) {
            System.out.println("File not found");
            return false;
        } catch (IOException e) {
            System.out.println("Error initializing stream " + e.toString());
            return false;
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return false;
        }
    }

    public Object read(String filepath) {
        Object o = null;
        try {
            FileInputStream fi = new FileInputStream(new File(filepath));
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

    public Boolean deleteFile(String filepath)  {
        File file = new File(filepath);
        if(file.delete())
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    public boolean createFile(String filepath) {
        File file = new File(filepath);
        if(file.canWrite()) {
            return true;
        }
        else {
            System.out.println("can not create file.\n");
            return false;
        }
    }
}
