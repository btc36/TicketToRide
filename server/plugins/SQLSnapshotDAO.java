package plugins;

import java.sql.*;
import java.util.logging.Logger;

import static java.lang.System.exit;

public class SQLSnapshotDAO implements ISnapshotDAO
{
    private static Logger logger;
    static
    {
        logger = Logger.getLogger("SQLSnapLog");
    }

    String databaseFilepath = "jdbc:sqlite:ttr.sqlite";
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

    }

    @Override
    public void clear()
    {
        boolean success = false;
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
        }
    }

    @Override
    public void updateSnapshot(Object object)
    {
        createTable();
        openConnection();
        closeStatements();
        closeConnection(true);
    }

    @Override
    public Object getLatestSnapshot()
    {
        return null;
    }


    private void createTable()
    {
        try
        {
            String sql = "CREATE TABLE IF NOT EXISTS SNAPSHOT (\n"
                    + "	id text NOT NULL PRIMARY KEY,\n"
                    + "	game blob NOT NULL\n"
                    + ");";
            stmt = conn.createStatement();
            stmt.execute(sql);
            System.out.println("table created\n");
        }
        catch(SQLException e)
        {
            e.printStackTrace();
        }
        finally
        {
            closeStatements();
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
            e.printStackTrace();
            exit(0);
        }
        catch (SQLException e)
        {
            System.out.println("Error occurred while opening connection");
            e.printStackTrace();
            exit(0);
        }
    }

    private void closeConnection(boolean commit)
    {
        logger.entering("Database", "closeConnection");
        try
        {
            if(conn!=null)
            {
                if(commit)
                {
                    System.out.println("Saving Database");
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
            System.err.println( e.getClass().getName() + ": " + e.getMessage() );
        }
        logger.exiting("Database", "closeConnection");
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
            System.err.println( e.getClass().getName() + ": " + e.getMessage() );
            exit(0);
        }
    }

    public static void main(String[] args)
    {
        new SQLSnapshotDAO().init();
    }
}
