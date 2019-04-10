package daos;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Date;
import java.util.logging.Logger;

import static java.lang.System.exit;

public class databasetest
{
    private static Logger logger;
    static
    {
        logger = Logger.getLogger("serverLog");
    }

    private daotest DAO;
    private Connection conn;
    private String dbName;
    private final String connectionURL = "jdbc:sqlite:familyserver.sqlite";
    public databasetest()
    {
        openConnection();
        DAO = new daotest(conn);
        DAO.createTable();
    }

    public void openConnection()
    {
        conn = null;
        try
        {
            Class.forName("org.sqlite.JDBC");
            conn = DriverManager.getConnection(connectionURL);
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
    public void closeConnection(boolean commit)
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

    public Connection getConn()
    {
        return conn;
    }
    public void setConn(Connection conn)
    {
        this.conn = conn;
    }

    public static void main(String[] args)
    {
        databasetest test = new databasetest();
        test.openConnection();
    }

}
