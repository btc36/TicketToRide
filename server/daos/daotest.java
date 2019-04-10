package daos;

import java.sql.*;
//import java.sql.SQLException;
import java.util.logging.Logger;

import static java.lang.System.exit;

public class daotest
{
    private static Logger logger;
    static
    {
        logger = Logger.getLogger("serverLog");
    }


    private Connection conn;
    private ResultSet rs;
    private PreparedStatement pstmt;
    private Statement stmt;

    public daotest(Connection conn)
    {
        this.conn = conn;
        rs = null;
        pstmt = null;
        stmt = null;
    }
    public void createTable()
    {
        try
        {
            String sql = "CREATE TABLE IF NOT EXISTS TEST (\n"
                    + "	testid text NOT NULL PRIMARY KEY,\n"
                    + "	content text NOT NULL\n"
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

    public void closeStatements()
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
}
