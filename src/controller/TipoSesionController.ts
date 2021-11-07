import { Request, Response } from 'express';
import { TipoSesion } from '../entity/TipoSesion';
import { validate } from 'class-validator';
import { catchAsync } from '../utils/catchAsync';

export class TipoSesionController {

  static getAll = catchAsync(async (req: Request, res: Response) => {
    const tiposSesion = await TipoSesion.find({ order: { id: 'ASC' } });
    if (tiposSesion.length > 0) {
      res.send(tiposSesion);
    } else {
      res.status(404).json({ message: 'No se han encontrado resultados' });
    }
  });

  static add = catchAsync(async (req: Request, res: Response) => {
    const { nombre, descripcion } = req.body;
    const tipoSesion = new TipoSesion();
    tipoSesion.nombre = nombre;
    tipoSesion.descripcion = descripcion;
    const errors = await validate(tipoSesion);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    await tipoSesion.save();
    res.status(201).json({ message: 'Tipo de Sesion creado' });
  });

  static getById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const tipoSesion = await TipoSesion.findOneOrFail(id);
    res.send(tipoSesion);
  });

  static edit = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    let tipoSesion = await TipoSesion.findOneOrFail(id);
    tipoSesion.nombre = nombre;
    tipoSesion.descripcion = descripcion;
    const errors = await validate(tipoSesion);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    await tipoSesion.save();
    res.status(200).json({ message: 'Tipo de Sesion modificado' });
  });

  static delete = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    let tipoSesion = await TipoSesion.findOneOrFail(id);
    tipoSesion.remove();
    res.status(200).json({ message: 'Tipo de Sesion eliminado' });
  });

}