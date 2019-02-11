package communication;

import java.io.*;
import java.net.*;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import com.sun.net.httpserver.*;

    /**
     * This class implements the homepage for the server.
     */
    class WebpageHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String filePathStr = ".." + File.separator + "client" + File.separator + "index.html"; //location of the html file
            Path filePath;
            OutputStream respBody = null;

            System.out.println(new File("").getAbsolutePath()); // print the current working directory

            try {
                if (exchange.getRequestMethod().toLowerCase().equals("get")) {
                    System.out.println("Recieved a GET request for the homepage");

                    exchange.sendResponseHeaders(HttpURLConnection.HTTP_OK, 0);

                    //check to see if file exists.
                    File tmpDir = new File(filePathStr);
                    if(!tmpDir.exists()) {
                        //if file does not exist, change path to that of the 404 page.
                        filePathStr = "web" + File.separator + "404.html";
                    }

                    try {
                        filePath = FileSystems.getDefault().getPath(filePathStr);
                        respBody = exchange.getResponseBody();
                        Files.copy(filePath, respBody);
                    }
                    catch(Exception e) {
                        System.out.println("Error: Check server files for 404 page " +
                                " and web folder.  " + e.toString());
                    }
                    if (respBody != null) {
                        respBody.close();
                    }
                }
            }
            catch (IOException e) {
                e.printStackTrace();
                exchange.sendResponseHeaders(HttpURLConnection.HTTP_SERVER_ERROR, 0);
            }
            finally {
                exchange.getResponseBody().close();
            }
        }
    }
