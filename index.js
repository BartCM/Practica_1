
import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

import recintosRouter from './routes/recintos.js';
import eventosRouter from './routes/eventos.js';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

app.use('/recintos', recintosRouter);
app.use('/eventos', eventosRouter);

try {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Conectado a MongoDB Atlas');

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
} catch (error) {
  console.error('Error conectando a MongoDB:', error.message);
  process.exit(1);
}

