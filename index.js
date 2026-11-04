
import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

import recintosRouter from './routes/recintos.js';
import eventosRouter from './routes/eventos.js';

const app = express();

app.use(express.json());
app.use('/recintos', recintosRouter);
app.use('/eventos', eventosRouter);

try {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Conectado a MongoDB Atlas');

  app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
  });
} catch (error) {
  console.error('Error conectando a MongoDB:', error.message);
  process.exit(1);
}
