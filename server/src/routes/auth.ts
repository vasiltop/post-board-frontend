import { Router } from 'express';
import { z } from 'zod';

import { pool } from '../database';
import { authenticate, validate } from '../middleware';
import { DatabaseError } from 'pg';
import { createHmac } from 'node:crypto';
import jwt from 'jsonwebtoken';

const router = Router();

const RegisterSchema = z.object({
  body: z.object({
    username: z.string().min(3).max(24),
    email: z.string().toLowerCase().min(6).max(64).email(),
    password: z.string().min(6).max(32),
  }),
  params: z.any(),
});

const LoginSchema = z.object({
  body: z.object({
    email: z.string().toLowerCase().min(6).max(64).email(),
    password: z.string().min(6).max(32),
  }),
  params: z.any(),
});

const errors: Record<string, string> = {
  user_email_key: 'Email is already taken.',
  user_pkey: 'Username is already taken',
};

function hashPassword(salt: string, password: string) {
  const hasher = createHmac('sha512', salt);
  hasher.update(password);

  return hasher.digest('hex');
}

router.post(
  '/register',
  validate(RegisterSchema),
  async (req: z.infer<typeof RegisterSchema>, res: any) => {
    try {
      await pool.query('INSERT INTO "user" VALUES ($1, $2, $3)', [
        req.body.username,
        req.body.email,
        hashPassword(req.body.email, req.body.password),
      ]);

      return res.status(200).send({ success: true });
    } catch (e) {
      if (e instanceof DatabaseError) {
        return res
          .status(409)
          .send({ success: false, error: errors[e.constraint!] });
      }
    }
  }
);

router.post(
  '/login',
  validate(LoginSchema),
  async (req: z.infer<typeof LoginSchema>, res: any) => {
    const { rows } = await pool.query(
      'SELECT password, username FROM "user" WHERE email = $1',
      [req.body.email]
    );

    if (!rows.length) {
      return res
        .status(404)
        .send({ success: false, error: 'Invalid username or password.' });
    }

    const inputPassword = hashPassword(req.body.email, req.body.password);

    if (inputPassword !== rows[0].password) {
      return res
        .status(404)
        .send({ success: false, error: 'Invalid username or password.' });
    }

    const token = jwt.sign(
      { username: rows[0].username },
      process.env.TOKEN_SECRET!
    );

    res.send({ success: true, data: { jwt: token } });
  }
);

router.get('/me', authenticate, async (req, res) => {
  res.send({ success: true, data: res.locals.user });
});

router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;

  const { rows } = await pool.query(
    'SELECT username, email FROM "user" WHERE username = $1',
    [userId]
  );
  if (!rows.length) {
    return res
      .status(400)
      .send({ success: false, error: 'User does not exist.' });
  }
  res.send({ success: true, data: rows[0] });
});

export default router;
