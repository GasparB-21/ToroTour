const { MongoClient, ObjectId } = require('mongodb');

//const MONGO_URI = 'mongodb://localhost:27017/'
const DB_NAME = 'practicas_SPW'
const MONGO_URI_ATLAS = process.env.MONGO_URI

class MongoLib {

    async connect() {
        if (MongoLib.connection != null) {
            return MongoLib.connection.db(DB_NAME);
        } else {
            try {
                MongoLib.connection = await MongoClient.connect(MONGO_URI_ATLAS)
                console.log('conectado a BBDD')
                return MongoLib.connection.db(DB_NAME)
            } catch(e){
                console.log('Error en conexión a BBDD')
                return e
            }
        }
    }

    async  fetchElementos(collection) {
        try {
            let db = await this.connect()
            let result = await db.collection(collection).find().toArray();
            return result;
        } catch (e) {
            return e;
        }
    }

    async fetchElementoById(collection, id) {
        try 
        {
            let db = await this.connect()
            //{_id: ObjectId.createFromHexString(id)}
            let result = await db.collection(collection).findOne( {_id: new ObjectId(id)} );
            return result;
        } catch (e) {
            return e;
        }
    }

    async addElemento(collection, tipo, itemID) 
    {

        const favorito = {
            tipo,
            itemID: new ObjectId(itemID),
            createdAt: new Date()
        }

        try 
        {
            let db = await this.connect()
            //Comprobamos si ese elemento ya esta añadido a favoritos
            let favoritoExistente = await db.collection(collection).findOne( {tipo, itemID: new ObjectId(itemID)} )
            if (favoritoExistente) {
                return 'El favorito ya existe'
            }
            let result = await db.collection(collection).insertOne(favorito)
            return result
        } catch(e)
        {
            return e;
        }
    }

    async delElemento(collection, tipo, itemID){
        let mensaje = ''
        try 
        {
            let db = await this.connect()
            let result = await db.collection(collection).deleteOne( {tipo, itemID: new ObjectId(itemID)} );
            if (result.deletedCount === 1)
            {
                mensaje = 'Elemento borrado con éxito'
            } else 
            {
                mensaje = 'Elemento no encontrado'
            }
            return mensaje
         } catch (e) 
         {
            return e;
         }
    }
}

module.exports = MongoLib;