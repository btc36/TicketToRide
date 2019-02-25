package model;

import java.util.*;

abstract public class Deck
{
    Queue<Card> deck;

    public Deck()
    {
        deck = new LinkedList<>();
    }
    public Queue<Card> getCards()
    {
        return deck;
    }
    public void add(Card card)
    {
        deck.add(card);
    }
    public Card poll()
    {
        return deck.isEmpty() ? null : deck.poll();
    }

}
