import { Request, Response } from 'express';
import { Clima } from '../entity/Clima';
import { validate } from 'class-validator';
import { catchAsync } from '../utils/catchAsync';

export class ClimaController {

  static getAll = catchAsync(async (req: Request, res: Response) => {
    const climas = await Clima.find({ order: { id: 'ASC' } });
    if (climas.length > 0) {
      res.send(climas);
    } else {
      res.status(404).json({ message: 'No se han encontrado resultados' });
    }
  });

  static add = catchAsync(async (req: Request, res: Response) => {
    const { nombre, descripcion } = req.body;
    const clima = new Clima();
    clima.nombre = nombre;
    clima.descripcion = descripcion;
    const errors = await validate(clima);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    await clima.save();
    res.status(201).json({ message: 'Clima creado' });
  });

  static getById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const clima = await Clima.findOneOrFail(id);
    res.send(clima);
  });

  static edit = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    let clima = await Clima.findOneOrFail(id);
    clima.nombre = nombre;
    clima.descripcion = descripcion;
    const errors = await validate(clima);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    await clima.save();
    res.status(200).json({ message: 'Clima modificado' });
  });

  static delete = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    let clima = await Clima.findOneOrFail(id);
    clima.remove();
    res.status(200).json({ message: 'Clima eliminado' });
  });

}