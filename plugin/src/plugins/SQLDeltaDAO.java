package plugins;


import java.io.*;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import static java.lang.System.exit;

public class SQLDeltaDAO implements IDeltaDAO
{
    private static Logger logger;
    static
    {
        logger = Logger.getLogger("SQLDeltaLog");
    }

    String databaseFilepath = "jdbc:sqlite:delta.sqlite";

    private Connection conn;
    private String dbName;
    private ResultSet rs;
    private PreparedStatement pstmt;
    private Statement stmt;

    public SQLDeltaDAO()
    {
        conn = null;
        rs = null;
        pstmt = null;
        stmt = null;
    }

    @Override
    public void init()
    {

    }

    @Override
    public void clear()
    {
        boolean commit = false;
        openConnection();
        try
        {
            String sql = "DELETE FROM DELTA";
            pstmt = conn.prepareStatement(sql);
            pstmt.executeUpdate();
            commit = true;
        }
        catch (SQLException e)
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
    public void addDelta(Object object)
    {
        boolean commit = false;

        createTable();

        openConnection();
        String s = "insert into DELTA(delta) values (?) ";


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
    public Object[] getAllDelta()
    {
        List<Object> deltas = new ArrayList<>();
        openConnection();
        boolean commit = false;
        try
        {
            stmt = conn.createStatement();
            rs = stmt.executeQuery("SELECT delta from DELTA");
            while(rs.next())
            {
                byte[] st = (byte[]) rs.getObject(1);
                ByteArrayInputStream baip = new ByteArrayInputStream(st);
                ObjectInputStream ois = new ObjectInputStream(baip);
                Object o = ois.readObject();
                deltas.add(o);
            }
            commit = true;
        } catch (Exception e)
        {
            printError(e);
        }
        finally
        {
            closeStatements();
            closeConnection(true);
        }

        return deltas.toArray(new Object[deltas.size()]);
    }

    private void createTable()
    {
        openConnection();
        boolean commit = false;
        try
        {
            String sql = "CREATE TABLE IF NOT EXISTS DELTA (\n"
                    + "	id INTEGER PRIMARY KEY AUTOINCREMENT,\n"
                    + "	delta BLOB NOT NULL\n"
                    + ");";
            stmt = conn.createStatement();
            stmt.execute(sql);
            System.out.println("table created\n");
            commit = true;
        }
        catch(SQLException e)
        {
            printError(e);
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

            //exit(0);
        }
        catch (SQLException e)
        {
            System.out.println("Error occurred while opening connection");
            printError(e);
            //exit(0);
        }
    }

    private void closeConnection(boolean commit)
    {
        logger.entering("SQLDeltaDAO", "closeConnection");
        try
        {
            if(conn!=null)
            {
                if(commit)
                {
                    System.out.println("Saving to DELTA SQL Database");
                    System.out.println("Thank you for using Delta Airline\n");
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
        logger.exiting("SQLDeltaDAO", "closeConnection");
    }

    private void closeStatements()
    {
        try
        {
            if(rs!=null) {
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
            System.err.println( e.getClass().getName() + ": " + e.getMessage() );
            exit(0);
        }
    }

    private void printError(Exception e)
    {
        System.out.println(e.getStackTrace());
        System.err.println( e.getClass().getName() + ": " + e.getMessage() );
    }

    public static void main(String args[])
    {
        SQLDeltaDAO dao = new SQLDeltaDAO();
        dao.createTable();
//        Object[] obs = dao.getAllDelta();
    }
}
