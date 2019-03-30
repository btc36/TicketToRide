package model;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class GameSetUp {

    //private static GameSetUp _instance;

    protected List<City> allCities;
    protected Deck destDeck;
    protected Deck trainDeck;
    protected List<Route> unClaimedRoutes;

    //-----------------------------------------------------------//
    private final String Seattle = "Seattle";
    private final String Portland = "Portland";
    private final String Sfo = "San Francisco";
    private final String La = "Los Angeles";
    private final String Vegas = "Las Vegas";
    private final String Phx = "Phoenix";
    private final String Paso = "El Paso";
    private final String Houston = "Houston";
    private final String Orleans = "New Orleans";
    private final String Miami = "Miami";
    //-----------------------------------------------------------//
    private final String Atlanta = "Atlanta";
    private final String Charleston = "Charleston";
    private final String Raleigh = "Raleigh";
    private final String Washington = "Washington DC";
    private final String Ny = "New York";
    private final String Boston = "Boston";
    private final String Pitts = "Pittsburgh";
    private final String Chicago = "Chicago";
    private final String Duluth = "Duluth";
    private final String Omaha = "Omaha";
    //-----------------------------------------------------------//
    private final String Helena = "Helena";
    private final String Slc = "Salt Lake City";
    private final String Denver = "Denver";
    private final String Oklahoma = "Oklahoma";
    private final String Kansas = "Kansas City";
    private final String Louis = "St Louis";
    private final String Rock = "Little Rock";
    private final String Dallas = "Dallas";
    private final String Nash = "Nashville";
    private final String Santa = "Santa Fe";

//    public static GameSetUp getInstance()
//    {
//        if(_instance == null)
//        {
//            _instance = new GameSetUp();
//        }
//        return _instance;
//    }
//    private GameSetUp()
//    {
//        setUpTrainCards();
//        setUpDestinationCards();
//        setUpCities();
//    }

    protected void setUpCities()
    {
        allCities = new ArrayList<>();


        //-----------------------------------------------------------//
        City seattle = new City(Seattle);
        City portland = new City(Portland);
        City sfo = new City(Sfo);
        City la = new City(La);
        City vegas = new City(Vegas);
        City phx = new City(Phx);
        City paso = new City(Paso);
        City houston = new City(Houston);
        City orleans = new City(Orleans);
        City miami = new City(Miami);
        //-----------------------------------------------------------//
        City atlanta = new City(Atlanta);
        City charleston = new City(Charleston);
        City raleigh = new City(Raleigh);
        City washington = new City(Washington);
        City ny = new City(Ny);
        City boston = new City(Boston);
        City pitts = new City(Pitts);
        City chicago = new City(Chicago);
        City duluth = new City(Duluth);
        City omaha = new City(Omaha);
        //-----------------------------------------------------------//
        City helena = new City(Helena);
        City slc = new City(Slc);
        City denver = new City(Denver);
        City oklahoma = new City(Oklahoma);
        City kansas = new City(Kansas);
        City louis = new City(Louis);
        City rock = new City(Rock);
        City dallas = new City(Dallas);
        City nash = new City(Nash);
        City santa = new City(Santa);

        allCities = Arrays.asList(seattle, portland, sfo, la, vegas, phx, paso, houston, orleans, miami,
                atlanta, charleston, raleigh, washington, ny, boston, pitts, chicago, duluth, omaha,
                helena, slc, denver, oklahoma, kansas, louis, rock, dallas, nash, santa);

//        seattle.addNeighbor(helena, portland);
//        portland.addNeighbor(seattle, sfo, slc);
//        sfo.addNeighbor(portland, slc, la);
//        la.addNeighbor(sfo, vegas, phx, paso);
//        vegas.addNeighbor(la, slc);
//        phx.addNeighbor(paso, denver, santa, la);
//        paso.addNeighbor(la, phx, santa, dallas, oklahoma);
//        paso.addNeighbor(houston);
//        houston.addNeighbor(dallas, paso, orleans);
//        orleans.addNeighbor(houston, rock, miami, atlanta);
//        miami.addNeighbor(atlanta, orleans, charleston);
//
//        //-----------------------------------------------------------//
//        atlanta.addNeighbor(orleans, nash, raleigh, charleston, miami);
//        charleston.addNeighbor(raleigh, atlanta, miami);
//        raleigh.addNeighbor(washington, nash, charleston, atlanta, pitts);
//        washington.addNeighbor(raleigh, ny, pitts);
//        ny.addNeighbor(boston, pitts, washington);
//        boston.addNeighbor(ny);
//        pitts.addNeighbor(nash);
//        pitts.addNeighbor(louis, chicago, ny, washington, raleigh);
//        chicago.addNeighbor(omaha, duluth, pitts, louis);
//        duluth.addNeighbor(helena, omaha, chicago);
//        omaha.addNeighbor(denver, helena, duluth, chicago, kansas);
//
//        //-----------------------------------------------------------//
//        helena.addNeighbor(seattle, slc, duluth, omaha, denver);
//        slc.addNeighbor(denver, helena, portland, sfo, vegas);
//        denver.addNeighbor(helena, oklahoma);
//        denver.addNeighbor(slc, phx, omaha, santa, kansas);
//        oklahoma.addNeighbor(paso);
//        oklahoma.addNeighbor(denver, kansas, santa, rock, dallas);
//        kansas.addNeighbor(denver, omaha, louis, oklahoma);
//        louis.addNeighbor(kansas, rock, nash, chicago, pitts);
//        rock.addNeighbor(dallas, orleans, nash, oklahoma, louis);
//        dallas.addNeighbor(houston, oklahoma, rock, paso);
//        nash.addNeighbor(louis, rock, atlanta, pitts, raleigh);
//        santa.addNeighbor(phx, paso, denver, oklahoma);
//        //-----------------------------------------------------------//

        unClaimedRoutes = new ArrayList<>();
        //-----------------------------------------------------------//
        unClaimedRoutes.add(new Route(Seattle,Portland,1,"grey"));
        addRoute(seattle, portland);
        unClaimedRoutes.add(new Route(Seattle,Helena,6,"yellow"));
        addRoute(seattle, helena);
        unClaimedRoutes.add(new Route(Slc,Helena,3,"pink"));
        addRoute(slc, helena);
        unClaimedRoutes.add(new Route(Duluth,Helena,6,"orange"));
        addRoute(duluth, helena);
        unClaimedRoutes.add(new Route(Omaha,Helena,5,"red"));
        addRoute(omaha, helena);
        unClaimedRoutes.add(new Route(Omaha,Duluth,2,"grey"));
        addRoute(omaha, duluth);
        unClaimedRoutes.add(new Route(Portland,Sfo,6,"green"));
        addRoute(portland, sfo);
        unClaimedRoutes.add(new Route(Portland,Slc,6,"blue"));
        addRoute(portland, slc);
        unClaimedRoutes.add(new Route(Sfo,La,3,"pink"));
        addRoute(sfo, la);
        unClaimedRoutes.add(new Route(Sfo,Slc,5,"white"));
        addRoute(sfo, slc);
        //-----------------------------------------------------------//
        unClaimedRoutes.add(new Route(Vegas,La,2,"grey"));
        addRoute(vegas, la);
        unClaimedRoutes.add(new Route(Vegas,Slc,3,"orange"));
        addRoute(vegas, slc);
        unClaimedRoutes.add(new Route(La,Phx,3,"grey"));
        addRoute(la, phx);
        unClaimedRoutes.add(new Route(La,Paso,6,"black"));
        addRoute(la, paso);
        unClaimedRoutes.add(new Route(Phx,Santa,3,"grey"));
        addRoute(phx, santa);
        unClaimedRoutes.add(new Route(Phx,Paso,3,"grey"));
        addRoute(phx, paso);
        unClaimedRoutes.add(new Route(Phx,Denver,5,"white"));
        addRoute(phx, denver);
        unClaimedRoutes.add(new Route(Paso,Santa,2,"grey"));
        addRoute(paso, santa);
        unClaimedRoutes.add(new Route(Denver,Santa,2,"grey"));
        addRoute(denver, santa);
        unClaimedRoutes.add(new Route(Denver,Slc,3,"red"));
        addRoute(denver, slc);
        //-----------------------------------------------------------//
        unClaimedRoutes.add(new Route(Denver,Helena,4,"green"));
        addRoute(denver, helena);
        unClaimedRoutes.add(new Route(Denver,Omaha,4,"pink"));
        addRoute(denver, omaha);
        unClaimedRoutes.add(new Route(Denver,Kansas,4,"black"));
        addRoute(denver, kansas);
        unClaimedRoutes.add(new Route(Denver,Oklahoma,4,"red"));
        addRoute(denver, oklahoma);
        unClaimedRoutes.add(new Route(Santa,Oklahoma,3,"blue"));
        addRoute(santa, oklahoma);
        unClaimedRoutes.add(new Route(Dallas,Paso,4,"red"));
        addRoute(dallas, paso);
        unClaimedRoutes.add(new Route(Houston,Paso,6,"green"));
        addRoute(houston, paso);
        unClaimedRoutes.add(new Route(Oklahoma,Paso,5,"yellow"));
        addRoute(oklahoma, paso);
        unClaimedRoutes.add(new Route(Oklahoma,Kansas,2,"grey"));
        addRoute(oklahoma, kansas);
        unClaimedRoutes.add(new Route(Oklahoma,Dallas,2,"grey"));
        addRoute(oklahoma, dallas);
        //-----------------------------------------------------------//
        unClaimedRoutes.add(new Route(Oklahoma,Rock,2,"grey"));
        addRoute(oklahoma, rock);
        unClaimedRoutes.add(new Route(Dallas,Rock,2,"grey"));
        addRoute(dallas, rock);
        unClaimedRoutes.add(new Route(Houston,Orleans,2,"grey"));
        addRoute(houston, orleans);
        unClaimedRoutes.add(new Route(Houston,Dallas,1,"grey"));
        addRoute(houston, dallas);
        unClaimedRoutes.add(new Route(Miami,Orleans,6,"red"));
        addRoute(miami, orleans);
        unClaimedRoutes.add(new Route(Atlanta,Miami,5,"blue"));
        addRoute(atlanta, miami);
        unClaimedRoutes.add(new Route(Charleston,Miami,4,"pink"));
        addRoute(charleston, miami);
        unClaimedRoutes.add(new Route(Charleston,Atlanta,2,"grey"));
        addRoute(charleston, atlanta);
        unClaimedRoutes.add(new Route(Charleston,Raleigh,2,"grey"));
        addRoute(charleston, raleigh);
        unClaimedRoutes.add(new Route(Rock,Orleans,3,"green"));
        addRoute(rock, orleans);
        //-----------------------------------------------------------//
        unClaimedRoutes.add(new Route(Atlanta,Orleans,4,"yellow"));
        addRoute(atlanta, orleans);
        unClaimedRoutes.add(new Route(Atlanta,Raleigh,2,"grey"));
        addRoute(atlanta, raleigh);
        unClaimedRoutes.add(new Route(Atlanta,Nash,1,"grey"));
        addRoute(atlanta, nash);
        unClaimedRoutes.add(new Route(Kansas,Omaha,1,"grey"));
        addRoute(kansas, omaha);
        unClaimedRoutes.add(new Route(Rock,Nash,3,"white"));
        addRoute(rock, nash);
        unClaimedRoutes.add(new Route(Kansas,Louis,2,"blue"));
        addRoute(kansas, louis);
        unClaimedRoutes.add(new Route(Louis,Rock,2,"grey"));
        addRoute(louis, rock);
        unClaimedRoutes.add(new Route(Louis,Nash,2,"grey"));
        addRoute(louis, nash);
        unClaimedRoutes.add(new Route(Louis,Chicago,2,"white"));
        addRoute(louis, chicago);
        unClaimedRoutes.add(new Route(Omaha,Chicago,4,"blue"));
        addRoute(omaha, chicago);
        //-----------------------------------------------------------//
        unClaimedRoutes.add(new Route(Duluth,Chicago,3,"red"));
        addRoute(duluth, chicago);
        unClaimedRoutes.add(new Route(Pitts,Chicago,3,"orange"));
        addRoute(pitts, chicago);
        unClaimedRoutes.add(new Route(Pitts,Louis,5,"green"));
        addRoute(pitts, louis);
        unClaimedRoutes.add(new Route(Pitts,Nash,4,"yellow"));
        addRoute(pitts, nash);
        unClaimedRoutes.add(new Route(Pitts,Raleigh,2,"grey"));
        addRoute(pitts, raleigh);
        unClaimedRoutes.add(new Route(Pitts,Washington,2,"grey"));
        addRoute(pitts, washington);
        unClaimedRoutes.add(new Route(Ny,Washington,2,"black"));
        addRoute(ny, washington);
        unClaimedRoutes.add(new Route(Raleigh,Washington,2,"grey"));
        addRoute(raleigh, washington);
        unClaimedRoutes.add(new Route(Raleigh,Nash,3,"black"));
        addRoute(raleigh, nash);
        unClaimedRoutes.add(new Route(Pitts,Ny,2,"white"));
        addRoute(pitts, ny);
        //-----------------------------------------------------------//
        unClaimedRoutes.add(new Route(Boston,Ny,2,"red"));
        addRoute(boston, ny);




    }
    public void addRoute(City city)
    {
        city.addRoute(recentRoute());
    }
    private void addRoute(City city1, City city2)
    {
        Route r = recentRoute();
        city1.addRoute(r);
        city2.addRoute(r);
    }
    private Route recentRoute()
    {
        return unClaimedRoutes.get(unClaimedRoutes.size() - 1);
    }

    /**
     * Sets up 110 Train Cards
     */
    protected void setUpTrainCards()
    {
        trainDeck = new Deck();

        for(int i = 0; i < 12; i++)
        {
            trainDeck.add(new TrainCard("pink"));
            trainDeck.add(new TrainCard("white"));
            trainDeck.add(new TrainCard("blue"));
            trainDeck.add(new TrainCard("yellow"));
            trainDeck.add(new TrainCard("orange"));
            trainDeck.add(new TrainCard("black"));
            trainDeck.add(new TrainCard("red"));
            trainDeck.add(new TrainCard("green"));
            trainDeck.add(new TrainCard("rainbow"));
        }
        trainDeck.add(new TrainCard("rainbow"));
        trainDeck.add(new TrainCard("rainbow"));
        trainDeck.shuffle();
    }

    /**
     * Sets up 30 Destination Cards
     */
    protected void setUpDestinationCards()
    {
        destDeck = new Deck();
        destDeck.add(new DestinationCard(Atlanta, Santa, 8));

        destDeck.add(new DestinationCard(Charleston, Paso, 10));
        destDeck.add(new DestinationCard(Charleston, Ny, 9));

        destDeck.add(new DestinationCard(Denver, Nash, 7));
        destDeck.add(new DestinationCard(Duluth, Charleston, 6));
        destDeck.add(new DestinationCard(Duluth, Miami, 9));

        destDeck.add(new DestinationCard(Paso, Charleston, 8));
        destDeck.add(new DestinationCard(Paso, Slc, 7));

        destDeck.add(new DestinationCard(Helena, Rock, 7));
        destDeck.add(new DestinationCard(Helena, Nash, 9));
        destDeck.add(new DestinationCard(Houston, Phx, 11));
        destDeck.add(new DestinationCard(Houston, Raleigh, 8));

        destDeck.add(new DestinationCard(Kansas, Dallas, 14));

        destDeck.add(new DestinationCard(Vegas, Denver, 4));
        destDeck.add(new DestinationCard(La, Duluth, 10));
        destDeck.add(new DestinationCard(La, Miami, 13));
        destDeck.add(new DestinationCard(La, Ny, 13));

        destDeck.add(new DestinationCard(Miami, Nash, 5));
        destDeck.add(new DestinationCard(Miami, Slc, 8));

        destDeck.add(new DestinationCard(Omaha, Miami, 6));

        destDeck.add(new DestinationCard(Phx, Helena, 5));
        destDeck.add(new DestinationCard(Phx, Washington, 10));
        destDeck.add(new DestinationCard(Pitts, Santa, 7));
        destDeck.add(new DestinationCard(Portland, Orleans, 8));
        destDeck.shuffle();
        destDeck.add(new DestinationCard(Louis, Atlanta, 9));
        destDeck.add(new DestinationCard(Louis, Boston, 11));
        destDeck.add(new DestinationCard(Slc, Pitts, 7));
        destDeck.add(new DestinationCard(Slc, Raleigh, 10));
        destDeck.add(new DestinationCard(Santa, Charleston, 9));

        destDeck.add(new DestinationCard(Washington, Helena, 14));

        destDeck.shuffle();
        destDeck.shuffle();

    }

    public List<City> getAllCities() { return allCities; }
    public Deck getDestDeck() { return destDeck; }
    public Deck getTrainDeck() { return trainDeck; }
    public void setAllCities(List<City> allCities) { this.allCities = allCities; }
    public void setDestDeck(Deck destDeck) { this.destDeck = destDeck; }
    public void setTrainDeck(Deck trainDeck) { this.trainDeck = trainDeck; }
    public void setUnClaimedRoutes(List<Route> unClaimedRoutes) { this.unClaimedRoutes = unClaimedRoutes; }
    public List<Route> getUnClaimedRoutes() { return unClaimedRoutes; }


    public boolean isClaimed(Route route) { return !unClaimedRoutes.contains(route); }
    protected City getCityByName(String city1) {
        for(City c : allCities)
            if(c.getName().equals(city1))
                return c;

        return null;
    }

    public void addTrainCard(TrainCard card) { trainDeck.add(card); }

}
