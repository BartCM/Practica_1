
import mongoose from 'mongoose';

const entradaSchema = new mongoose.Schema({
  tipo: {
    type: String,
    required: true,
    minlength: 3
  },
  precio: {
    type: Number,
    required: true,
    min: 0
  },
  disponibles: {
    type: Number,
    required: true,
    min: 0,
    validate: Number.isInteger
  }
});

const eventoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    minlength: 5
  },
  fecha: {
    type: Date,
    required: true
  },
  entradas: [entradaSchema],
  recinto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'recintos',
    required: true
  }
});

export default mongoose.model('eventos', eventoSchema);