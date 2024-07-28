const mongoose  = require('mongoose');
const dotenv = require('dotenv');

dotenv.config()


class MongoSingleton {

    static #instance

    constructor(){ 
        mongoose.connect(process.env.MONGO_URL)
    }
    
    static getInstance() {
        if(this.#instance){
            console.log("Ya estamos conectados");
            return this.#instance;
        }
        //Como no tenemos Instancia conectada Crea una llamando al 
        //Metodo 
        this.#instance = new MongoSingleton();
        console.log("Conectado");
        //Devuelve la instancia Creada:
        return this.#instance;
    }
}


module.exports =  MongoSingleton;
