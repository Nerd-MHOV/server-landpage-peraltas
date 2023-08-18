import { NextFunction, Request, Response } from "express";

export const isAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const user = request.user;
  try {
    if (!user || !user.level || user.level < 2)
      throw new Error("Não Autorizado");
    next();
  } catch (err) {
    return response.status(401).json({
      err: err,
      message: {
        type: "error",
        message: "Não autorizado!",
      },
    });
  }
};
