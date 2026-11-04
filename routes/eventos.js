
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

router.put('/:id', async (req, res) => {
  try {
    const evento = await Evento.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (evento) {
      res.status(200).json({
        ok: true,
        resultado: evento
      });
    } else {
      res.status(404).json({
        ok: false,
        error: `Error actualizando evento ${req.params.id}`
      });
    }
  } catch (error) {
    res.status(404).json({
      ok: false,
      error: `Error actualizando evento ${req.params.id}`
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const evento = await Evento.findByIdAndDelete(req.params.id);

    if (evento) {
      res.status(200).json({
        ok: true,
        resultado: evento
      });
    } else {
      res.status(404).json({
        ok: false,
        error: `Error eliminando evento ${req.params.id}`
      });
    }
  } catch (error) {
    res.status(404).json({
      ok: false,
      error: `Error eliminando evento ${req.params.id}`
    });
  }
});

router.get('/entradas/:idEvento/:tipoEntrada', async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.idEvento);

    const entrada = evento?.entradas.find(
      entrada => entrada.tipo === req.params.tipoEntrada
    );

    if (entrada) {
      res.status(200).json({
        ok: true,
        resultado: {
          precio: entrada.precio,
          disponibles: entrada.disponibles
        }
      });
    } else {
      res.status(404).json({
        ok: false,
        error: `Error obteniendo datos de entrada para evento ${req.params.idEvento}`
      });
    }
  } catch (error) {
    res.status(404).json({
      ok: false,
      error: `Error obteniendo datos de entrada para evento ${req.params.idEvento}`
    });
  }
});


router.put('/entradas/:idEvento/:tipoEntrada/:cantidad', async (req, res) => {
  const { idEvento, tipoEntrada, cantidad } = req.params;

  try {
    const unidades = Number(cantidad);
    const evento = await Evento.findById(idEvento);

    const entrada = evento?.entradas.find(
      entrada => entrada.tipo === tipoEntrada
    );

    if (
      !entrada ||
      !Number.isInteger(unidades) ||
      unidades <= 0 ||
      entrada.disponibles < unidades
    ) {
      return res.status(404).json({
        ok: false,
        error: `Error actualizando entradas del evento ${idEvento}`
      });
    }

    entrada.disponibles -= unidades;

    const resultado = await evento.save();

    res.status(200).json({
      ok: true,
      resultado: resultado
    });
  } catch (error) {
    res.status(404).json({
      ok: false,
      error: `Error actualizando entradas del evento ${idEvento}`
    });
  }
});

export default router;