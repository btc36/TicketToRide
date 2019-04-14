package plugins.FileDB;

import daos.databasetest;

import java.lang.reflect.Array;
import java.util.ArrayList;

public class ObjectToFromFileTester {
    public static void main(String[] args)
    {

        ObjectToFromFile fileHandler = new ObjectToFromFile("test.db");

        fileHandler.deleteFile();
        for(int i = 0; i < 10; i++) {
            ArrayList arr = new ArrayList<>();
            arr.add("1");
            arr.add("2");
            arr.add("3");
            fileHandler.write(arr);
        }

        ArrayList arl = fileHandler.read();
        for(Object o : arl) {
            String s = (String)o;
            System.out.println(s);
        }
    }
}
