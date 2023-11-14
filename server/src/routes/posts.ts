import { Router } from 'express';
import { pool } from '../database';
import { authenticate, validate } from '../middleware';
import { z } from 'zod';

const router = Router();

const postSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(32),
    content: z.string().min(3).max(256),
  }),
  params: z.any(),
});

router.get('/', authenticate, async (req, res) => {
  const { rows } = await pool.query(
    `SELECT post.*, (post_like.post_id IS NOT NULL) as liked FROM post 
    LEFT JOIN post_like 
      ON post.id = post_like.post_id 
        AND post_like.user_id = $1
    ORDER BY post.id DESC
        `,
    [res.locals.user.username]
  );

  res.send({ success: true, data: { postList: rows } });
});

router.get('/:postId/like', authenticate, async (req, res) => {
  const postId = req.params.postId;

  await pool.query('BEGIN');
  await pool.query('INSERT INTO "post_like" VALUES ($1, $2)', [
    postId,
    res.locals.user.username,
  ]);
  await pool.query('UPDATE "post" SET likes = likes + 1 WHERE id=$1', [postId]);
  await pool.query('COMMIT');

  res.send({ success: true });
});

router.get('/:postId/unlike', authenticate, async (req, res) => {
  const postId = req.params.postId;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const deleted = await client.query(
      'DELETE FROM "post_like" WHERE post_id = $1 AND user_id = $2',
      [postId, res.locals.user.username]
    );
    console.log(deleted);
    if (deleted.rowCount > 0) {
      await client.query('UPDATE "post" SET likes = likes - 1 WHERE id=$1', [
        postId,
      ]);
      await client.query('COMMIT');
    } else {
      await client.query('ROLLBACK');
    }
  } finally {
    client.release();
  }

  res.send({ success: true });
});

router.post(
  '/create',
  authenticate,
  validate(postSchema),
  async (req: z.infer<typeof postSchema>, res: any) => {
    await pool.query(
      'INSERT INTO "post" (title, author, content, likes) VALUES ($1, $2, $3, $4)',
      [req.body.title, res.locals.user.username, req.body.content, 0]
    );

    res.send({ success: true });
  }
);

export default router;
