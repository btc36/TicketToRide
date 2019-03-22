package model;

import java.util.ArrayList;
import java.util.List;

public class GameSetUp {

    private static GameSetUp _instance;
    private List<City> allCities;
    private Deck destDeck;
    private Deck trainDeck;
    private List<Route> unClaimedRoutes;

    public static GameSetUp getInstance()
    {
        if(_instance == null)
        {
            _instance = new GameSetUp();
        }
        return _instance;
    }
    private GameSetUp()
    {
        setUpTrainCards();
        setUpDestinationCards();
        setUpCities();
    }

    private void setUpCities()
    {
        allCities = new ArrayList<>();
        City seattle = new City("Seattle");
        City portland = new City("Portland");
        City sfo = new City("San Francisco");
        City la = new City("Los Angeles");
        City vegas = new City("Las Vegas");
        City phx = new City("Phoenix");
        City paso = new City("El Paso");
        City houston = new City("Houston");
        City orleans = new City("New Orleans");
        City miami = new City("Miami");
        City atlanta = new City("Atlanta");
        City charleston = new City("Charleston");
        City raleigh = new City("Raleigh");
        City washington = new City("Washington DC");
        City ny = new City("New York");
        City boston = new City("Boston");
        City pitts = new City("Pittsburgh");
        City chicago = new City("Chicago");
        City duluth = new City("Duluth");
        City omaha = new City("Omaha");
        City helena = new City("Helena");
        City slc = new City("Salt Lake City");
        City denver = new City("Denver");
        City oklahoma = new City("Oklahoma");
        City kansas = new City("Kansas");
        City louis = new City("St Louis");
        City rock = new City("Little Rock");
        City dallas = new City("Dallas");
        City nash = new City("Nashville");
        City santa = new City("Santa Fe");
        City arkansas = new City("Arkansas");

        allCities.add(seattle);
        allCities.add(portland);
        allCities.add(sfo);
        allCities.add(la);
        allCities.add(vegas);
        allCities.add(phx);
        allCities.add(paso);
        allCities.add(houston);
        allCities.add(pitts);
        allCities.add(duluth);
        allCities.add(omaha);
        allCities.add(helena);
        allCities.add(slc);
        allCities.add(denver);
        allCities.add(oklahoma);
        allCities.add(kansas);
        allCities.add(orleans);
        allCities.add(miami);
        allCities.add(atlanta);
        allCities.add(charleston);
        allCities.add(louis);
        allCities.add(nash);
        allCities.add(santa);
        allCities.add(rock);
        allCities.add(dallas);
        allCities.add(arkansas);

        seattle.addNeighbor(helena);
        seattle.addNeighbor(portland);
        portland.addNeighbor(seattle);
        portland.addNeighbor(sfo);
        portland.addNeighbor(slc);
        sfo.addNeighbor(portland);
        sfo.addNeighbor(slc);
        sfo.addNeighbor(la);
        la.addNeighbor(sfo);
        la.addNeighbor(vegas);
        la.addNeighbor(phx);
        la.addNeighbor(paso);
        vegas.addNeighbor(la);
        vegas.addNeighbor(slc);
        slc.addNeighbor(denver);
        slc.addNeighbor(helena);
        slc.addNeighbor(portland);
        slc.addNeighbor(sfo);
        slc.addNeighbor(vegas);
        helena.addNeighbor(seattle);
        helena.addNeighbor(slc);
        helena.addNeighbor(duluth);
        helena.addNeighbor(omaha);
        helena.addNeighbor(denver);
        denver.addNeighbor(helena);
        denver.addNeighbor(slc);
        denver.addNeighbor(phx);
        denver.addNeighbor(omaha);
        denver.addNeighbor(santa);
        denver.addNeighbor(kansas);
        denver.addNeighbor(oklahoma);

        duluth.addNeighbor(helena);
        duluth.addNeighbor(omaha);
        duluth.addNeighbor(chicago);

        omaha.addNeighbor(denver);
        omaha.addNeighbor(helena);
        omaha.addNeighbor(duluth);
        omaha.addNeighbor(chicago);
        omaha.addNeighbor(kansas);

        kansas.addNeighbor(denver);
        kansas.addNeighbor(omaha);
        kansas.addNeighbor(louis);
        kansas.addNeighbor(oklahoma);

        chicago.addNeighbor(omaha);
        chicago.addNeighbor(duluth);
        chicago.addNeighbor(pitts);
        chicago.addNeighbor(louis);

        pitts.addNeighbor(nash);
        pitts.addNeighbor(louis);
        pitts.addNeighbor(chicago);
        pitts.addNeighbor(ny);
        pitts.addNeighbor(washington);
        pitts.addNeighbor(raleigh);


        ny.addNeighbor(boston);
        ny.addNeighbor(pitts);
        ny.addNeighbor(washington);
        boston.addNeighbor(ny);

        unClaimedRoutes = new ArrayList<>();
        unClaimedRoutes.add(new Route("Seattle","Portland",1,"grey"));
        addRoute(seattle);
        addRoute(portland);
        unClaimedRoutes.add(new Route("Portland","San Francisco",1,"green"));
        addRoute(portland);
        addRoute(sfo);
        unClaimedRoutes.add(new Route("San Francisco","Los Angeles",3,"pink"));
        addRoute(sfo);
        addRoute(la);
        unClaimedRoutes.add(new Route("Los Angeles","Phoenix",3,"grey"));
        addRoute(la);
        addRoute(phx);
        unClaimedRoutes.add(new Route("Los Angeles","Las Vegas",2,"grey"));
        addRoute(la);
        vegas.addRoute(recentRoute());
        unClaimedRoutes.add(new Route("Los Angeles","El Paso",6,"black"));
        addRoute(la);
        addRoute(paso);
        unClaimedRoutes.add(new Route("Phoenix","Santa Fe",1,"grey"));
        addRoute(phx);
        santa.addRoute(recentRoute());
        unClaimedRoutes.add(new Route("El Paso","Santa Fe",1,"grey"));
        addRoute(paso);
        santa.addRoute(recentRoute());
        unClaimedRoutes.add(new Route("Phoenix","El Paso",1,"grey"));
        addRoute(paso);
        addRoute(phx);
        unClaimedRoutes.add(new Route("El Paso","Dallas",1,"grey"));
        addRoute(paso);
        addRoute(dallas);
        unClaimedRoutes.add(new Route("El Paso","Houston",1,"grey"));
        addRoute(paso);
        addRoute(houston);
        unClaimedRoutes.add(new Route("Dallas","Arkansas",1,"grey"));
        addRoute(dallas);
        addRoute(arkansas);
        unClaimedRoutes.add(new Route("Dallas","Houston",1,"grey"));
        addRoute(dallas);
        addRoute(houston);
        unClaimedRoutes.add(new Route("Houston","New Orleans",1,"grey"));
        addRoute(houston);
        addRoute(orleans);
        unClaimedRoutes.add(new Route("New Orleans","Miami",1,"grey"));
        addRoute(orleans);
        addRoute(miami);
        unClaimedRoutes.add(new Route("Atlanta","Miami",1,"grey"));
        addRoute(miami);
        addRoute(atlanta);
        unClaimedRoutes.add(new Route("New York","Washington",1,"grey"));
        addRoute(ny);
        addRoute(washington);
        unClaimedRoutes.add(new Route("Washington","Raleigh",1,"grey"));
        addRoute(washington);
        addRoute(raleigh);
        unClaimedRoutes.add(new Route("Raleigh","Charleston",1,"grey"));
        addRoute(raleigh);
        addRoute(charleston);
        unClaimedRoutes.add(new Route("Charleston","Miami",1,"grey"));
        addRoute(charleston);
        addRoute(miami);
        unClaimedRoutes.add(new Route("Pittsburgh","New York",1,"grey"));
        addRoute(pitts);
        addRoute(ny);

    }
    public void addRoute(City city)
    {
        city.addRoute(recentRoute());
    }
    public Route recentRoute()
    {
        return unClaimedRoutes.get(unClaimedRoutes.size() - 1);
    }

    /**
     * Sets up 110 Train Cards
     */
    private void setUpTrainCards()
    {
        trainDeck = new Deck();

        for(int i = 0; i < 6; i++)
        {
            trainDeck.add(new TrainCard("pink"));
            trainDeck.add(new TrainCard("white"));
            trainDeck.add(new TrainCard("green"));
            trainDeck.add(new TrainCard("yellow"));
            trainDeck.add(new TrainCard("rainbow"));
            trainDeck.add(new TrainCard("black"));
            trainDeck.add(new TrainCard("red"));
            trainDeck.add(new TrainCard("white"));
            trainDeck.add(new TrainCard("blue"));
            trainDeck.add(new TrainCard("orange"));
            trainDeck.add(new TrainCard("blue"));
            trainDeck.add(new TrainCard("yellow"));
            trainDeck.add(new TrainCard("green"));
            trainDeck.add(new TrainCard("red"));
            trainDeck.add(new TrainCard("orange"));
            trainDeck.add(new TrainCard("black"));
            trainDeck.add(new TrainCard("rainbow"));
            trainDeck.add(new TrainCard("pink"));
        }
        trainDeck.add(new TrainCard("rainbow"));
        trainDeck.add(new TrainCard("rainbow"));
        trainDeck.shuffle();
    }

    /**
     * Sets up 30 Destination Cards
     */
    private void setUpDestinationCards()
    {
        destDeck = new Deck();
        destDeck.add(new DestinationCard("Atlanta", "Santa Fe", 8));

        destDeck.add(new DestinationCard("Charleston", "El Paso", 10));
        destDeck.add(new DestinationCard("Charleston", "New York", 9));

        destDeck.add(new DestinationCard("Denver", "Nashville", 7));
        destDeck.add(new DestinationCard("Duluth", "Charleston", 6));
        destDeck.add(new DestinationCard("Duluth", "Miami", 9));

        destDeck.add(new DestinationCard("El Paso", "Charleston", 8));
        destDeck.add(new DestinationCard("El Paso", "Salt Lake City", 7));

        destDeck.add(new DestinationCard("Helena", "Little Rock", 7));
        destDeck.add(new DestinationCard("Helena", "Nashville", 9));
        destDeck.add(new DestinationCard("Houston", "Phoenix", 11));
        destDeck.add(new DestinationCard("Houston", "Raleigh", 8));

        destDeck.add(new DestinationCard("Kansas City", "Dallas", 14));

        destDeck.add(new DestinationCard("Las Vegas", "Denver", 4));
        destDeck.add(new DestinationCard("Los Angeles", "Duluth", 10));
        destDeck.add(new DestinationCard("Los Angeles", "Miami", 13));
        destDeck.add(new DestinationCard("Los Angeles", "New York", 13));

        destDeck.add(new DestinationCard("Miami", "Atlanta", 5));
        destDeck.add(new DestinationCard("Miami", "Salt Lake City", 8));

        destDeck.add(new DestinationCard("Omaha", "Miami", 6));

        destDeck.add(new DestinationCard("Phoenix", "Helena", 5));
        destDeck.add(new DestinationCard("Phoenix", "Washington DC", 10));
        destDeck.add(new DestinationCard("Pittsburgh", "Santa Fe", 7));
        destDeck.add(new DestinationCard("Portland", "New Orleans", 8));
        destDeck.shuffle();
        destDeck.add(new DestinationCard("Saint Louis", "Atlanta", 9));
        destDeck.add(new DestinationCard("Saint Louis", "Boston", 11));
        destDeck.add(new DestinationCard("Salt Lake City", "Pittsburgh", 7));
        destDeck.add(new DestinationCard("Salt Lake City", "Raleigh", 10));
        destDeck.add(new DestinationCard("Santa Fe", "Charleston", 9));

        destDeck.add(new DestinationCard("Washington DC", "Helena", 14));

        destDeck.shuffle();
        destDeck.shuffle();

    }

    public List<City> getAllCities() { return allCities; }
    public Deck getDestDeck() { return destDeck; }
    public Deck getTrainDeck() { return trainDeck; }
    public List<Route> getUnClaimedRoutes() { return unClaimedRoutes; }
}
