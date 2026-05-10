const fs = require('fs')
const MongoLib = require('../lib/mongo')
class MonumentosService{

    constructor(){
        this.coleccion = 'monumentos'
        this.mongoDB = new MongoLib()
    }

    async getMonumentos()
    {
        try 
        {
            // let ciudades = await fs.promises.readFile("./utils/mocks/ciudades.json");
            const monumentos = await this.mongoDB.fetchElementos(this.coleccion)
            return monumentos;
        } catch(error){
            console.log('Error recuperando monumentos')
        }

    }
    
    async getMonumentosById(id)
    {
        try 
        {
            const monumento = await this.mongoDB.fetchElementoById(this.coleccion, id)
            return monumento;
        } catch(error){
            console.log('Error recuperando monumento por id')
        }
    }
}

module.exports = MonumentosService