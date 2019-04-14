package plugins.FileDB;


import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Scanner;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.stream.Stream;

//singleton
public class ObjectToFromFile {
    private String filepath;
    private String seperator = "\n\r\n\r\n\r";

    // private constructor restricted to this class itself
    public ObjectToFromFile(String filepath) {
        this.filepath = filepath;
    }


    public Boolean write(Object obj) {
        ObjectOutputStream os;
        FileOutputStream f;
        boolean append = true;
        try {
//            File file = new File("append.txt");
//            FileWriter fr = new FileWriter(file, true);
//            fr.write("data");
//            fr.close();

            f = new FileOutputStream(new File(filepath), append);
            os = new ObjectOutputStream(f);
            os.writeObject(obj);
            f.write(seperator.getBytes());
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
            e.printStackTrace();
            return false;
        }
    }

    public ArrayList<Object> read() {
        ArrayList<Object> objects = new ArrayList<>();
        try {
            File f = new File(filepath);
            byte[] bytes = Files.readAllBytes(f.toPath());
            String s = new String(bytes);
            Scanner scan = new Scanner(s);
            scan.useDelimiter(Pattern.compile(seperator));

            while (scan.hasNextLine()) {
                String line = scan.next();
                ByteArrayInputStream in = new ByteArrayInputStream(line.getBytes(StandardCharsets.UTF_8));
                ObjectInputStream is = new ObjectInputStream(in);
                Object oo = is.readObject();
                String ss = (String)oo;
                objects.add(oo);
                in.close();
                is.close();
            }
            scan.close();

//            BufferedReader br = new BufferedReader(new FileReader(filepath));
//            String line;
//            while ((line = br.readLine()) != null) {
//                System.out.println(line);
//                ByteArrayInputStream in = new ByteArrayInputStream(line.getBytes(StandardCharsets.UTF_8));
//                ObjectInputStream is = new ObjectInputStream(in);
//                Object oo = is.readObject();
//                objects.add(oo);
//                in.close();
//                is.close();
//            }
//            br.close();
        } catch (FileNotFoundException e) {
            System.out.println("File not found");
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

    public boolean createFile() {
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
