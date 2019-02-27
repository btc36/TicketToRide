package model;

import java.util.*;

abstract public class Deck<T>
{
    Queue<T> deck;

    public Deck()
    {
        deck = new LinkedList<>();
    }
    public Queue<T> getCards()
    {
        return deck;
    }
    public void add(T card)
    {
        deck.add(card);
    }
    public T poll()
    {
        return deck.isEmpty() ? null : deck.poll();
    }

}
