const fs = require('fs')
const MongoLib = require('../lib/mongo')
class EventosService{

    constructor(){
        this.coleccion = 'eventos'
        this.mongoDB = new MongoLib()
    }

    async getEventos()
    {
        try 
        {
            // let ciudades = await fs.promises.readFile("./utils/mocks/ciudades.json");
            const eventos = await this.mongoDB.fetchElementos(this.coleccion)
            return eventos;
        } catch(error){
            console.log('Error recuperando eventos')
        }

    }
    
    async getEventosById(id)
    {
        try 
        {
            const evento = await this.mongoDB.fetchElementoById(this.coleccion, id)
            return evento;
        } catch(error){
            console.log('Error recuperando evento por id')
        }
    }
}

module.exports = EventosService