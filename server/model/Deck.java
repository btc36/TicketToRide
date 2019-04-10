package model;

import java.io.Serializable;
import java.util.*;

public class Deck<T> implements Serializable
{
    /**
     * @invariant size() >= 0
     * @invariant isEmpty() == true iff size() == 0
     */
    Queue<T> deck;

    /**
     * @pre none
     */
    public Deck()
    {
        deck = new LinkedList<>();
    }

    /**
     * @pre card != null
     * @post deck is unchanged
     * @return deck, which is queue, that contains Type T, which is instance of Destination Card or Train Card
     */
    public Queue<T> getCards()
    {
        return deck;
    }

    /**
     * Add a Card to the very bottom (end) of the deck
     * @param card to be added to the queue
     * @pre deck != null
     * @pre card != null
     * @pre card is instance of Destinatino Card or Train Card
     * @post size() == old(size()) + 1
     * @post Add a Card to the very bottom (end) of the deck
     */
    public void add(T card)
    {
        deck.add(card);
    }

    /**
     * removes and returns the very front (or the top) of Card in the deck
     * @pre !isEmpty() (which means size() >= 1)
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
    public int getSize()
    {
        return deck.size();
    }



    /**
     * removes and returns the first three of Cards from the deck
     * @pre !isEmpty()
     * @pre size() >= 3
     * @post size() == old(size()) - 3
     * @post returns three cards from the very front (or the top) of the deck
     */
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
