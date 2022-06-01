class Config {

}

class DevelopmentConfig extends Config {
    public isdevelopment = true;
    public mysql = { host: "localhost", user: "root", password: "", database: "vacationspro" };
}

class ProductionConfig extends Config {
    public isdevelopment = false;
    public mysql = { host: "eu-cdbr-west-02.cleardb.net", user: "b60e0dd343cf7c", password: "d3effe5c", database: "heroku_b1662509d93fa1b" };
}

const config = process.env.NODE_ENV === "production" ? new ProductionConfig() : new DevelopmentConfig();

export default config;
