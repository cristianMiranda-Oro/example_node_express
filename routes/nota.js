import express from 'express';
const router = express.Router();

//importar el modelo nota
import Nota from '../models/nota';

//Agregar una nota
router.post('/nueva-nota', async(req, res) => {
    return res.status(200);
    /* const body = req.body;
    try {
        const notaDB = await Nota.create(body);
        res.status(200).json(notaDB);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            error
        })
    } */
});

//Exportamos la configuracion de express app
module.exports = router;