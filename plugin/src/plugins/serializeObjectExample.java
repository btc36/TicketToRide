//package plugins;
//import java.io.File;
//import java.io.FileInputStream;
//import java.io.FileNotFoundException;
//import java.io.FileOutputStream;
//import java.io.IOException;
//import java.io.ObjectInputStream;
//import java.io.ObjectOutputStream;
//
//public class serializeObjectExample {
//    public static void main(String[] args) {
//        tester.Phase3Tester.main(null);
//        model.ServerModel servermodel = model.ServerModel.getInstance();
//        System.out.println("ORIGINAL OBJECT: " + servermodel.toString());
//
//        try {
//            FileOutputStream f = new FileOutputStream(new File("serverModel.db"));
//            ObjectOutputStream o = new ObjectOutputStream(f);
//            // Write objects to file
//            o.writeObject(servermodel);
//            o.close();
//            f.close();
//
//
//
//
//
//
//            FileInputStream fi = new FileInputStream(new File("serverModel.db"));
//            ObjectInputStream oi = new ObjectInputStream(fi);
//            // Read objects
//            model.ServerModel servermodel1 = (model.ServerModel) oi.readObject();
//
//            System.out.println("AFTER RESTORE FROM FILE: " + servermodel1.toString());
//
//            oi.close();
//            fi.close();
//
//        } catch (FileNotFoundException e) {
//            System.out.println("File not found");
//        } catch (IOException e) {
//            System.out.println("Error initializing stream " + e.toString());
//        } catch (ClassNotFoundException e) {
//            // TODO Auto-generated catch block
//            e.printStackTrace();
//        }
//    }
//}
