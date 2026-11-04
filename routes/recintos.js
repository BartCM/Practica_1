
import express from 'express';
import Recinto from '../models/recinto.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const recintos = await Recinto.find();

    if (recintos.length > 0) {
      res.status(200).json({
        ok: true,
        resultado: recintos
      });
    } else {
      res.status(500).json({
        ok: false,
        error: 'No se han encontrado recintos'
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: 'No se han encontrado recintos'
    });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const recinto = await Recinto.findById(req.params.id);

    if (recinto) {
      res.status(200).json({
        ok: true,
        resultado: recinto
      });
    } else {
      res.status(404).json({
        ok: false,
        error: `Recinto ${req.params.id} no encontrado`
      });
    }
  } catch (error) {
    res.status(404).json({
      ok: false,
      error: `Recinto ${req.params.id} no encontrado`
    });
  }
});


router.get('/localidad/:nombre', async (req, res) => {
  try {
    const recintos = await Recinto.find({
      localidad: req.params.nombre
    });

    if (recintos.length > 0) {
      res.status(200).json({
        ok: true,
        resultado: recintos
      });
    } else {
      res.status(404).json({
        ok: false,
        error: 'No se han encontrado recintos de la localidad indicada'
      });
    }
  } catch (error) {
    res.status(404).json({
      ok: false,
      error: 'No se han encontrado recintos de la localidad indicada'
    });
  }
});


router.post('/', async (req, res) => {
  try {
    const recinto = new Recinto(req.body);
    const resultado = await recinto.save();

    res.status(201).json({
      ok: true,
      resultado: resultado
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: 'Error añadiendo recinto'
    });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const recinto = await Recinto.findByIdAndDelete(req.params.id);

    if (recinto) {
      res.status(200).json({
        ok: true,
        resultado: recinto
      });
    } else {
      res.status(404).json({
        ok: false,
        error: `Error eliminando recinto ${req.params.id}`
      });
    }
  } catch (error) {
    res.status(404).json({
      ok: false,
      error: `Error eliminando recinto ${req.params.id}`
    });
  }
});

export default router;