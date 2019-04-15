package plugins;

public interface IPluginFactory {
    IDBPlugin getDBPluginInstance(String pluginDirectory, String pluginJarName, String pluginClassName)throws Exception ;
}
