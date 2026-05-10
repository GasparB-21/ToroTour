const fs = require('fs')
const MongoLib = require('../lib/mongo')
class FavoritosService{

    constructor(){
        this.coleccion = 'favoritos'
        this.mongoDB = new MongoLib()
    }

    async getFavoritos()
    {
        try 
        {
            // let ciudades = await fs.promises.readFile("./utils/mocks/ciudades.json");
            const favoritos = await this.mongoDB.fetchElementos(this.coleccion)
            return favoritos;
        } catch(error){
            console.log(`Error ${error} recuperando favoritos`)
        }

    }

    async getFavoritoById(id)
    {
        try 
        {
            const favoritos = await this.mongoDB.fetchElementoById(this.coleccion, id)
            return favoritos;
        } catch(error){
            console.log(`Error ${error} recuperando favoritos`)
        }

    }
    
    async postFavorito(tipo, itemID)
    {
        try 
        {
            const favoritos = await this.mongoDB.addElemento(this.coleccion, tipo, itemID)
            return favoritos;
        } catch(error){
            console.log(`Error ${error} añadiendo favorito`)
        }
    }

    async delFavorito(tipo, itemID)
    {  
        try 
        {
            const resultado = await this.mongoDB.delElemento(this.coleccion, tipo, itemID)
            return resultado
        }
        catch(error)
        {
            console.log(`Error ${error} en el servicio de borrado`)
        }
    }
} 

module.exports = FavoritosService