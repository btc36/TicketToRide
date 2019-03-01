package model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


//TODO: TO BE CHANGED.....

public class DestinationCardDeck extends Deck
{
    public DestinationCardDeck()
    {

    }

    public List<Card> getThree()
    {
        List<Card> cards = new ArrayList<>();
        while(!deck.isEmpty() || cards.size() < 3)
        {
            cards.add((Card)deck.poll());
        }
        return cards;
    }
}
