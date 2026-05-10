const express = require('express')
const FavoritosService = require('../servicios/favoritosService')


function favoritosAPI(app){
    const router = express.Router()
    app.use('/api/favoritos', router)

    const favoritosService = new FavoritosService()

    //RECUPERAR TODOS LOS FAVORITOS
    router.get('/', async function (req, res, next){
        try{
            const favoritos = await favoritosService.getFavoritos()
            res.status(200).json(
                {
                    data: favoritos,
                    message: 'Favoritos recuperados con éxito'
                }
            )
        } catch(err){
            console.log(`Se produjo un error ${err}`)
            res.status(500).json({ message: 'Error al recuperar el favorito' })
        } 
    })

    //RECUPERAR UN FAVORITO POR SU ID
    router.get('/:id', async function (req, res, next){
        try{
            const { id } = req.params
            const favorito = await favoritosService.getFavoritoById(id)
            res.status(200).json(
                {
                    data: favorito,
                    message: 'Favorito recuperado con éxito'
                }
            )
        } catch(err){
            console.log(`Se produjo un error ${err}`)
            res.status(500).json({ message: 'Error al recuperar el favorito' })
        } 
    })

    //AÑADIR UN FAVORITO
    router.post('/', async function (req, res, next)
    {
        try{
            const {tipo, itemID} = req.body
            favoritoAnadido = await favoritosService.postFavorito(tipo, itemID)
            if (favoritoAnadido === 'El favorito ya existe') {
                return res.status(409).json({ message: 'El favorito ya existe' })
            }
            res.status(201).json(
                {
                    data: favoritoAnadido,
                    message: 'Favorito añadido con éxito'
                }
            )
        } catch(err){
            console.log(`Se produjo un error ${err}`)
            res.status(500).json({error: `Se produjo el error ${err} al añadir el favorito`})
        } 
    })

    //ELIMINAR UN FAVORITO POR SU ID
    router.delete('/', async function (req, res, next){
        try
        {
            const {tipo, itemID} = req.body
            resultado = await favoritosService.delFavorito(tipo, itemID)
            if (resultado === 'Elemento no encontrado') {
                return res.status(404).json({ message: 'El favorito no existe' })
            }
            res.status(200).json(
                { 
                    data: resultado, 
                    message: resultado
                }
            )
        } 
        catch(err)
        {
            console.log(`Se produjo un error ${err} al borrar el favorito`)
        } 
    })

}

module.exports = favoritosAPI