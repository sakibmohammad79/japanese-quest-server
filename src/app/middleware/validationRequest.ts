import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Directly pass req.body to the schema
      await schema.parseAsync(req.body);
      next();
    } catch (err) {
      next(err);
    }
  };
};
