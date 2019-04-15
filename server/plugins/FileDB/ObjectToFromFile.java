package plugins.FileDB;

import java.io.*;
import java.util.ArrayList;


public class ObjectToFromFile {
    private String filepath;
    BufferedOutputStream outputBuffer = null;

    public ObjectToFromFile(String filepath) {
        this.filepath = filepath;
    }

    public Boolean write(Object obj) {
        try {
            Boolean fileAlreadyExists =  new File(filepath).exists();
            FileOutputStream fileOutputStream = new FileOutputStream(filepath, true);
            outputBuffer = new BufferedOutputStream(fileOutputStream);
            if(fileAlreadyExists) {
                AppendableObjectOutputStream appendableOutStream = new AppendableObjectOutputStream(outputBuffer);
                appendableOutStream.writeObject(obj);
                appendableOutStream.close();
            }
            else {//if file does not exist, we must first use ObjectOutputStream to make the headers work. Thereafter, use AppendableObjectOutputStream.
                ObjectOutputStream os = new ObjectOutputStream(outputBuffer);
                os.writeObject(obj);
                os.close();
            }
            return true;
        } catch (IOException e) {
            System.out.println("Error initializing stream " + e.toString());
            return false;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public ArrayList<Object> read() {
        ArrayList<Object> objects = new ArrayList<>();
        try {
            FileInputStream fis = new FileInputStream(filepath);
            ObjectInputStream in = new ObjectInputStream(fis);
            try{
                while(true)
                    objects.add(in.readObject());
            }catch( Exception e ) {
                //when readObject is done reading, it throws an EOF exception to end the while loop.
            }
        } catch (IOException e) {
            System.out.println("Error initializing stream " + e.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return objects;
    }

    public Boolean deleteFile()  {
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
}
