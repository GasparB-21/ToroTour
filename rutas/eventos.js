const express = require('express')
const EventosService = require('../servicios/eventosService')


function eventosAPI(app){
    const router = express.Router()
    app.use('/api/eventos', router)

    const eventosService = new EventosService()

    //RECUPERAR TODOS LOS EVENTOS
    router.get('/', async function (req, res, next){
        try{
            const eventos = await eventosService.getEventos()
            res.status(200).json(
                {
                    data: eventos,
                    message: 'Eventos recuperados con éxito'
                }
            )
        } catch(err){
            console.log(`Se produjo un error ${err}`)
            res.status(500).json({ message: 'Error al recuperar el evento' })
        } 
    })

    //RECUPERAR UN EVENTO POR SU ID
    router.get('/:id', async function (req, res, next){
        try{
            const { id } = req.params
            const evento = await eventosService.getEventosById(id)
            res.status(200).json(
                {
                    data: evento,
                    message: 'Evento recuperado con éxito'
                }
            )
        } 
        catch(err)
        {
            console.log(`Se produjo un error ${err}`)
            res.status(500).json({ message: 'Error al recuperar el evento' })
        }
    })

}

module.exports = eventosAPI;
