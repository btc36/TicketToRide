package plugins;

public class SQLSnapshotDAO implements ISnapshotDAO
{
    String databaseFilepath = "jdbc:sqlite:ttr.sqlite";

    public SQLSnapshotDAO()
    {

    }

    @Override
    public void clear()
    {

    }

    @Override
    public void updateSnapshot()
    {

    }

    @Override
    public ISnapshotDAO getLatestSnapshot()
    {
        return null;
    }
}
