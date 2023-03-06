import express from 'express';
import config from 'config';
import mongoose from 'mongoose';
import { authRoute } from './routes/authRoute.js';
import cors from 'cors';
import { linkRouter } from './routes/linkRoutes.js';
import { redirectRouter } from './routes/redirectRoute.js';

const PORT = config.get('port') || 5000;
const app = express();

app.use(cors());
app.use(express.json({ extended: true }));
app.use('/api/auth', authRoute)
app.use('/api/link', linkRouter)
app.use('/t', redirectRouter)

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {

    });

    app.listen(PORT, () => {
      console.log(`running on http://localhost:${PORT}`);
    })
  } catch (error) {
    console.log('server error', error.message);
    process.exit(1);
  }
}

start();



