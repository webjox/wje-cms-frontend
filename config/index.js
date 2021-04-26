class Config {
    constructor(){
        this.port = 3000;
        this.serverAPIurl = `http://localhost:8080/api/v1`;
        this.serverAJAXurl = `http://localhost:8080/ajax`;
        this.jwtSecretKey = 'webjox';
    }
}

export default new Config();