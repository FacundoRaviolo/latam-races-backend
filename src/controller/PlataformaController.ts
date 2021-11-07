import { Request, Response } from 'express';
import { Plataforma } from '../entity/Plataforma';
import { validate } from 'class-validator';
import { catchAsync } from '../utils/catchAsync';

export class PlataformaController {

  static getAll = catchAsync(async (req: Request, res: Response) => {
    const plataformas = await Plataforma.find({ order: { id: 'ASC' } });
    if (plataformas.length > 0) {
      res.send(plataformas);
    } else {
      res.status(404).json({ message: 'No se han encontrado resultados' });
    }
  });

  static add = catchAsync(async (req: Request, res: Response) => {
    const { nombre, descripcion, logo } = req.body;
    const plataforma = new Plataforma();
    plataforma.nombre = nombre;
    plataforma.descripcion = descripcion;
    plataforma.logo = logo;
    const errors = await validate(plataforma);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    await plataforma.save();
    res.status(201).json({ message: 'Plataforma creada' });
  });

  static getById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const plataforma = await Plataforma.findOneOrFail(id);
    res.send(plataforma);
  });

  static edit = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nombre, descripcion, logo } = req.body;
    let plataforma = await Plataforma.findOneOrFail(id);
    plataforma.nombre = nombre;
    plataforma.descripcion = descripcion;
    plataforma.logo = logo;
    const errors = await validate(plataforma);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    await plataforma.save();
    res.status(200).json({ message: 'Plataforma modificada' });
  });

  static delete = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    let plataforma = await Plataforma.findOneOrFail(id);
    plataforma.remove();
    res.status(200).json({ message: 'Plataforma eliminada' });
  });

}