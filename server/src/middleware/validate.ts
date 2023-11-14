import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export default function (schema: z.ZodSchema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedData = await schema.parseAsync({
        body: req.body,
        params: req.params,
      });

      req.body = parsedData.body;
      req.params = parsedData.params;

      next();
    } catch (e) {
      if (e instanceof z.ZodError) {
        res.status(400).send({
          success: false,
          error: e.errors[0]?.message,
        });
      }
    }
  };
}
