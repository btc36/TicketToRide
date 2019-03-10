package model;

import java.util.*;

public class Deck<T>
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
    // draw
    public T poll()
    {
        return deck.isEmpty() ? null : deck.poll();
    }
    public void shuffle()
    {
        Collections.shuffle((LinkedList)deck);
    }

    public List<T> pollThree()
    {
        List<T> cards = new ArrayList<>();
        while(!deck.isEmpty() && cards.size() < 3)
        {
            cards.add(deck.poll());
        }
        return cards;
    }
    public List<T> pollFive()
    {
        List<T> cards = new ArrayList<>();
        while(!deck.isEmpty() && cards.size() < 5)
        {
            cards.add(deck.poll());
        }
        return cards;
    }
    public List<T> pollThisMany(int count)
    {
        List<T> cards = new ArrayList<>();
        while(!deck.isEmpty() && cards.size() < count)
        {
            cards.add(deck.poll());
        }
        return cards;
    }
    public boolean isEmpty()
    {
        return deck.isEmpty();
    }
    public int getSize() { return deck.size(); }
}
