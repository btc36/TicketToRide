package communication;

import com.sun.net.httpserver.HttpServer;
import model.ServerModel;
import plugins.IDBPlugin;
import plugins.PluginFactory;
import server.GamePersister;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.io.InputStream;
import java.util.Properties;
import java.util.logging.ConsoleHandler;
import java.util.logging.Handler;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.logging.SimpleFormatter;

public class ServerCommunicator {

    private static Logger logger;
    static
    {
        try
        {
            initLog();
        }
        catch(IOException e)
        {
            System.out.println("Could not initalize log: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private static void initLog() throws IOException
    {
        /*log settings*/
        Level logLevel = Level.FINEST;
        logger = Logger.getLogger("serverLog");
        logger.setLevel(logLevel);
        logger.setUseParentHandlers(false);

        /*Log to console*/
        Handler consoleHandler = new ConsoleHandler();
        consoleHandler.setLevel(logLevel);
        consoleHandler.setFormatter(new SimpleFormatter());
        logger.addHandler(consoleHandler);

    }

    private static final int MAX_WAITING_CONNECTIONS = 12;
    private HttpServer server;

    /**
     *  Run the server and the back-end functionality to start
     * @pre
     * @param portNumber Portnumber for the connection to be established
     */
    public void run(String portNumber)
    {
        System.out.println("Initializing HTTP Server on port : " + portNumber);
        try
        {
            server = HttpServer.create(
                    new InetSocketAddress(Integer.parseInt(portNumber)),
                    MAX_WAITING_CONNECTIONS);
        }
        catch (IOException e)
        {
            e.printStackTrace();
            return;
        }

        server.setExecutor(null);
        System.out.println("Creating contexts");
        //server.createContext("/exec_command", new ExecCommandHandler());
        server.createContext("/", new WebpageHandler());
        server.createContext("/command", new CommandHandler());
        System.out.println("Starting server");
        server.start();
        System.out.println("Server started. Listening......");
    }


    /** Main method for the Ticket To Ride Server
     * @pre
     * @param args the command line arguments
     */
    public static void main(String[] args) throws Exception
    {
        System.out.print(System.getProperty("user.dir"));

        String portNumber = args[0];
        String pluginType = args[1];
        int maxDeltas = Integer.parseInt(args[2]);
        Boolean clear = false;
        if (args.length > 3){
            clear = true;
        }

        // TODO: Load these 3 values from a config based on pluginType
        String pluginDirectory = "";
        String pluginJarName = "";
        String pluginClassName = "";
        String propFileName = "";
        if(pluginType.equals("sql")){
            propFileName = "Resources/sqlconfig.properties";

        }else if (pluginType.equals("file")){
            propFileName = "Resources/fileconfig.properties";
        }
        if(!propFileName.equals("")){
            try {
                Properties prop = new Properties();
                FileInputStream inputStream = new FileInputStream(propFileName);

                if (inputStream != null) {
                    prop.load(inputStream);
                } else {
                    throw new FileNotFoundException("property file '" + propFileName + "' not found in the classpath");
                }

                // get the property value and print it out
                pluginDirectory = prop.getProperty("pluginDirectory");
                pluginJarName = prop.getProperty("pluginJarName");
                pluginClassName = prop.getProperty("pluginClassName");

                inputStream.close();

            } catch (Exception e) {
                System.out.println("Exception: " + e);
            }
        }

        IDBPlugin plugin = new PluginFactory().getDBPluginInstance(pluginDirectory, pluginJarName, pluginClassName);
        GamePersister.GetInstance().SetMaxDeltas(maxDeltas);
        GamePersister.GetInstance().SetDeltaDao(plugin.getDeltaDAO());
        GamePersister.GetInstance().SetSnapshotDao(plugin.getSnapshotDAO());
        if (clear){
            GamePersister.GetInstance().ClearDatabase();
        }
        ServerModel.getInstance().LoadFromDatabase();

        new ServerCommunicator().run(portNumber);
    }
}
