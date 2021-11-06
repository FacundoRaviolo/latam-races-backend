import { EntityNotFoundError } from "typeorm";

export const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    if (err instanceof EntityNotFoundError) {
      res.status(404).json({ message: 'No se han encontrado resultados' });
    } else {
      res.status(500).json({ message: 'Se ha producido un error al intentar realizar la acción solicitada' });
    }
    next(err);
  });
};