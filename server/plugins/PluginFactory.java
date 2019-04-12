package plugins;

import java.io.File;
import java.net.URL;
import java.net.URLClassLoader;

public class PluginFactory implements IPluginFactory {
    @Override
    public IDBPlugin getDBPluginInstance(String pluginDirectory, String pluginJarName, String pluginClassName)throws Exception {
        // Get a class loader and set it up to load the jar file
        File pluginJarFile = new File(pluginDirectory, pluginJarName);
        URL pluginURL = pluginJarFile.toURI().toURL();
        URLClassLoader loader = new URLClassLoader(new URL[]{pluginURL});

        // Load the jar file's plugin class, create and return an instance
        Class<? extends IDBPlugin> DBPluginClass = (Class<IDBPlugin>) loader.loadClass(pluginClassName);
        return DBPluginClass.getDeclaredConstructor(null).newInstance();
    }
}
