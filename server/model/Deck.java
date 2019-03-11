package model;

import java.util.*;

public class Deck<T>
{
    /**
     * @invariant size() >= 0
     * @invariant isEmpty() == true iff size() == 0
     */
    Queue<T> deck;

    public Deck()
    {
        deck = new LinkedList<>();
    }

    /**
     * @pre none
     * @post deck is unchanged
     * @return
     */
    public Queue<T> getCards()
    {
        return deck;
    }

    /**
     * Add a Card to the very bottom (end) of the deck
     * @pre deck != null
     * @post size() == old(size()) + 1
     * @post Add a Card to the very bottom (end) of the deck
     */
    public void add(T card)
    {
        deck.add(card);
    }

    /**
     * removes and returns the very front (or the top) of Card in the deck
     * @pre !isEmpty()
     * @post size() == old(size()) - 1
     * @post returns a Card from the very front (or the top) of the deck
     */
    public T poll()
    {
        return deck.isEmpty() ? null : deck.poll();
    }

    /**
     * @pre !isEmpty()
     * @post size() == old(size())
     * @post the deck is in a random order
     */
    public void shuffle()
    {
        Collections.shuffle((LinkedList)deck);
    }

    /**
     * Is the deck empty?
     * @pre none
     * @post return value == true if and only if size() == 0
     * @post deck remains unchanged
     */
    public boolean isEmpty()
    {
        return deck.isEmpty();
    }

    /**
     * What is the size of the deck?
     * @pre none
     * @post return size()
     * @post deck remains unchanged
     */
    public int getSize() { return deck.size(); }


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

}
