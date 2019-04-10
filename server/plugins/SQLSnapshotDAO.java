package plugins;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import static java.lang.System.exit;

public class SQLSnapshotDAO implements ISnapshotDAO
{
    String databaseFilepath = "jdbc:sqlite:ttr.sqlite";
    private Connection conn;
    private String dbName;

    public SQLSnapshotDAO()
    {

    }

    @Override
    public void init()
    {
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

    @Override
    public void clear()
    {

    }

    @Override
    public void updateSnapshot(Object object)
    {

    }

    @Override
    public Object getLatestSnapshot()
    {
        return null;
    }
}
