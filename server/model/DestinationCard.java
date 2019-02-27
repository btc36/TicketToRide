package model;

public class DestinationCard extends Card
{
    private String src;
    private String dst;
    private Integer point;
    public DestinationCard(){}

    public DestinationCard(String src, String dst, Integer point)
    {
        this.src= src;
        this.dst = dst;
        this.point = point;
    }

    public String getSrc() {
        return src;
    }

    public void setSrc(String src) {
        this.src = src;
    }

    public String getDst() {
        return dst;
    }

    public void setDst(String dst) {
        this.dst = dst;
    }

    public Integer getPoint() {
        return point;
    }

    public void setPoint(Integer point) {
        this.point = point;
    }
}
