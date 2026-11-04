
import express from 'express';
import Evento from '../models/evento.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const eventos = await Evento.find().populate('recinto');

    if (eventos.length > 0) {
      res.status(200).json({
        ok: true,
        resultado: eventos
      });
    } else {
      res.status(500).json({
        ok: false,
        error: 'No se han encontrado eventos'
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: 'No se han encontrado eventos'
    });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id).populate('recinto');

    if (evento) {
      res.status(200).json({
        ok: true,
        resultado: evento
      });
    } else {
      res.status(404).json({
        ok: false,
        error: `Evento ${req.params.id} no encontrado`
      });
    }
  } catch (error) {
    res.status(404).json({
      ok: false,
      error: `Evento ${req.params.id} no encontrado`
    });
  }
});


router.get('/localidad/:nombre', async (req, res) => {
  try {
    const eventos = await Evento.find({
      fecha: { $gte: new Date() }
    }).populate('recinto');

    const resultado = eventos.filter(
      evento => evento.recinto?.localidad === req.params.nombre
    );

    if (resultado.length > 0) {
      res.status(200).json({
        ok: true,
        resultado: resultado
      });
    } else {
      res.status(404).json({
        ok: false,
        error: 'No se han encontrado eventos'
      });
    }
  } catch (error) {
    res.status(404).json({
      ok: false,
      error: 'No se han encontrado eventos'
    });
  }
});


router.post('/', async (req, res) => {
  try {
    const evento = new Evento(req.body);
    const resultado = await evento.save();

    res.status(201).json({
      ok: true,
      resultado: resultado
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: 'Error añadiendo evento'
    });
  }
});

export default router;