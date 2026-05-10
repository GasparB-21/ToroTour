const express = require('express');

const MonumentosService = require('../servicios/monumentosService');

function monumentosAPI(app) {
    const router = express.Router();
    app.use('/api/monumentos', router);

    const monumentosService = new MonumentosService();

    //RECUPERAR TODOS LOS MONUMENTOS
    router.get('/', async function (req, res, next){
        try{
            const monumentos = await monumentosService.getMonumentos()
            res.status(200).json(
                {
                    data: monumentos,
                    message: 'Monumentos recuperados con éxito'
                }
            )
        } catch(err){
            console.log(`Se produjo un error ${err}`)
            res.status(500).json({ message: 'Error al recuperar el monumento' })
        } 
    })

    //RECUPERAR UN MONUMENTO POR SU ID
    router.get('/:id', async function (req, res, next){
        try{
            const { id } = req.params
            const monumento = await monumentosService.getMonumentosById(id)
            res.status(200).json(
                {
                    data: monumento,
                    message: 'Monumento recuperado con éxito'
                }
            )
        } 
        catch(err)
        {
            console.log(`Se produjo un error ${err}`)
            res.status(500).json({ message: 'Error al recuperar el monumento' })
        }
    })

    /*
    router.put('/:id', async function (req, res, next){
        try{
            
        } catch(err){
            console.log(`se produjo un error ${err} al modificar la ciudad`)
        } 
    })
    */
}

module.exports = monumentosAPI;