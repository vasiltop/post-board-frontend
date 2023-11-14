import express from 'express';
import { pool } from './database';
import authRouter from './routes/auth';
import postRouter from './routes/posts';
import cors from 'cors';

const port = 8000;

async function main() {
  await pool.connect();
  console.log('Connected to DB.');

  const app = express();
  app.use(express.json());
  app.use(
    cors({
      origin: true,
    })
  );
  app.use('/user', authRouter);
  app.use('/post', postRouter);

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

main();
