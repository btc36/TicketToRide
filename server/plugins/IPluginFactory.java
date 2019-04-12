package plugins;

public interface IPluginFactory {
    public IDBPlugin getDBPluginInstance(String pluginDirectory, String pluginJarName, String pluginClassName)throws Exception ;
}
