class Config {
}

class DevelopmentConfig extends Config {
    
    //vacations:
    public vacationsUrl = "http://localhost:3001/api/vacations/";
    public vacationsImageUrl = "http://localhost:3001/api/vacations/images/";
    public socket = "http://localhost:3001/";


    //auto:
    public registerUrl = "http://localhost:3001/api/auth/register/";
    public loginUrl = "http://localhost:3001/api/auth/login/";


    //follows:
    public followsUrl = 'http://localhost:3001/api/follows/';
}

class ProductionConfig extends Config {
    public socket = "https://vacation-web-eran-samimian.herokuapp.com/";
    public registerUrl = "https://vacation-web-eran-samimian.herokuapp.com/api/auth/register/";
    public loginUrl = "https://vacation-web-eran-samimian.herokuapp.com/api/auth/login/";
    public vacationsImageUrl = "https://vacation-web-eran-samimian.herokuapp.com/api/vacations/images/";
    public vacationsUrl = "https://vacation-web-eran-samimian.herokuapp.com/api/vacations/";
    public followsUrl = 'https://vacation-web-eran-samimian.herokuapp.com/api/follows/';




}

const config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default config;
