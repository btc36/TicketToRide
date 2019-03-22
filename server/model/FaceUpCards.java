package model;

import java.util.ArrayList;
import java.util.List;

public class FaceUpCards {
    private List<TrainCard> faceUpCards;
    public FaceUpCards()
    {
        faceUpCards = new ArrayList<>();
    }
    public FaceUpCards(List<TrainCard> faceUpCards)
    {
        this.faceUpCards = faceUpCards;
    }

    public boolean isThreeOrMoreWild()
    {
        int count = 0;
        for(TrainCard card : faceUpCards)
        {
            if(card.getColor().equals("rainbow"))
            {
                count++;
            }
        }
        return count >= 3;
    }
    public List<TrainCard> getFaceUpCards()
    {
        return faceUpCards;
    }
    public TrainCard getCardAt(int index) { return faceUpCards.get(index); }
    public void setCardAt(int index, TrainCard card) { faceUpCards.set(index, card); }
    public void setFaceUpCards(List<TrainCard> faceUpCards)
    {
        this.faceUpCards = faceUpCards;
    }
    public void addFaceUpCard(TrainCard card)
    {
        this.faceUpCards.add(card);
    }
    public void clear()
    {
        this.faceUpCards.clear();
    }
    public int size() { return faceUpCards.size(); }
}

