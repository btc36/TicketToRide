package plugins;


import model.PlayerModel;
import model.ServerModel;

import java.io.*;
import java.sql.*;
import java.util.logging.Logger;

import static java.lang.System.exit;

public class SQLSnapshotDAO implements ISnapshotDAO
{
    public static int id = 0;
    private static Logger logger;
    static
    {
        logger = Logger.getLogger("SQLSnapLog");
    }

    String databaseFilepath = "jdbc:sqlite:snapshot.sqlite";
    private Connection conn;
    private String dbName;
    private ResultSet rs;
    private PreparedStatement pstmt;
    private Statement stmt;

    public SQLSnapshotDAO()
    {
        this.conn = null;
        this.rs = null;
        this.pstmt = null;
        this.stmt = null;
    }

    @Override
    public void init()
    {
        openConnection();
        createTable();
        closeConnection(true);
    }

    @Override
    public void clear()
    {
        boolean success = false;
        openConnection();
        try
        {
            String sql = "DELETE FROM SNAPSHOT";
            pstmt = conn.prepareStatement(sql);
            pstmt.executeUpdate();
            success = true;
        }
        catch (SQLException e)
        {
            e.printStackTrace();
        }
        finally
        {
            closeStatements();
            closeConnection(success);
        }
    }

    @Override
    public void updateSnapshot(Object object)
    {
        boolean commit = false;
        createTable();
        clear();
        openConnection();
        String s = "insert into SNAPSHOT values (?) ";

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try
        {
            ObjectOutputStream oos = new ObjectOutputStream(baos);
            oos.writeObject(object);
        } catch (IOException e)
        {
            printError(e);
        }
        byte[] Bytes = baos.toByteArray();
        ByteArrayInputStream bais = new ByteArrayInputStream(Bytes);
        try
        {
            pstmt = conn.prepareStatement(s);
            pstmt.setBinaryStream(1, bais, Bytes.length);
            pstmt.executeUpdate();
            commit = true;
        } catch (SQLException e)
        {
            printError(e);
        }
        finally
        {
            closeStatements();
            closeConnection(commit);
        }
    }

    @Override
    public Object getLatestSnapshot()
    {
        Object o = null;
        openConnection();
        try
        {
            stmt = conn.createStatement();
            rs = stmt.executeQuery("SELECT snapshot from SNAPSHOT");
            while(rs.next())
            {
                byte[] st = (byte[]) rs.getObject(1);
                ByteArrayInputStream baip = new ByteArrayInputStream(st);
                ObjectInputStream ois = new ObjectInputStream(baip);
                o = ois.readObject();
            }
        } catch (Exception e)
        {
            e.printStackTrace();
        }
       return o;
    }

    private void createTable()
    {
        openConnection();
        boolean commit = false;
        try
        {
            String sql = "CREATE TABLE IF NOT EXISTS SNAPSHOT (\n"
                    + "	snapshot BLOB NOT NULL\n"
                    + ");";

            stmt = conn.createStatement();
            stmt.execute(sql);
            System.out.println("table created\n");
            commit = true;
        }
        catch(SQLException e)
        {
            e.printStackTrace();
        }
        finally
        {
            closeStatements();
            closeConnection(commit);
        }
    }

    private void openConnection()
    {
        conn = null;
        try
        {
            Class.forName("org.sqlite.JDBC");
            conn = DriverManager.getConnection(databaseFilepath);
            conn.setAutoCommit(false);
        }
        catch (ClassNotFoundException e)
        {
            printError(e);
        }
        catch (SQLException e)
        {
            System.out.println("Error occurred while opening connection");
            printError(e);
        }
    }

    private void closeConnection(boolean commit)
    {
        logger.entering("SQLSnapshotDAO", "closeConnection");
        try
        {
            if(conn!=null)
            {
                if(commit)
                {
                    System.out.println("Saving SNAPSHOT SQL Database");
                    conn.commit();
                }
                else
                    conn.rollback();
                conn.close();
                conn = null;
            }
        }
        catch(Exception e)
        {
            System.out.println("Error occurred while closing connection");
            printError(e);
        }
        logger.exiting("SQLSnapshotDAO", "closeConnection");
    }

    private void closeStatements()
    {
        try
        {
            if(rs!=null)
            {
                rs.close();
                rs = null;
            }
            if(pstmt!=null)
            {
                pstmt.close();
                pstmt = null;
            }
            if(stmt!=null)
            {
                stmt.close();
                stmt = null;
            }
        }
        catch(Exception e)
        {
            System.out.println("Error occurred while closing connection");
            printError(e);
        }
    }

//    private String serialize(Object object)
//    {
//        Gson gson = new GsonBuilder().setPrettyPrinting().create();
//        String json = gson.toJson((PlayerModel)object);
//        return json;
//    }
//
//    private Object deserialize(String json)
//    {
//        Gson gson = new GsonBuilder().setPrettyPrinting().create();
//        return gson.fromJson(json, PlayerModel.class);
//    }

    private void printError(Exception e)
    {
        System.out.println(e.getStackTrace());
        System.err.println( e.getClass().getName() + ": " + e.getMessage() );
    }

    public static void main(String[] args)
    {
        // (model.ServerModel) oi.readObject();
        SQLSnapshotDAO dao = new SQLSnapshotDAO();
        PlayerModel d = new PlayerModel("user","pass");
       // dao.clear();
        dao.updateSnapshot(d);
        PlayerModel p = (PlayerModel)dao.getLatestSnapshot();
        System.out.println(p.getUsername());
    }
}
