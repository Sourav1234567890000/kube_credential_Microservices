import express, { NextFunction, Request, Response } from "express";

export const errorHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.method);
  res.status(404).send("Not Found");
};
