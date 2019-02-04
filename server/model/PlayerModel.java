package model;

public class PlayerModel
{
    private String username;
    private String password;
    private String authToken;

    public PlayerModel()
    {

    }
    public PlayerModel(String username, String password)
    {
        this.username = username;
        this.password = password;
    }
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAuthToken() {
        return authToken;
    }

    public void setAuthToken(String authToken) {
        this.authToken = authToken;
    }
    public boolean isValid()
    {
        if(username == null || password == null)
            return false;

        return true;
    }


}
