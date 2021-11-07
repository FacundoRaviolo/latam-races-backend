import { Request, Response } from 'express';
import { EstadoCarrera } from '../entity/EstadoCarrera';
import { validate } from 'class-validator';
import { catchAsync } from '../utils/catchAsync';

export class EstadoCarreraController {

  static getAll = catchAsync(async (req: Request, res: Response) => {
    const estadosCarrera = await EstadoCarrera.find({ order: { id: 'ASC' } });
    if (estadosCarrera.length > 0) {
      res.send(estadosCarrera);
    } else {
      res.status(404).json({ message: 'No se han encontrado resultados' });
    }
  });

  static add = catchAsync(async (req: Request, res: Response) => {
    const { nombre, descripcion } = req.body;
    const estadoCarrera = new EstadoCarrera();
    estadoCarrera.nombre = nombre;
    estadoCarrera.descripcion = descripcion;
    const errors = await validate(estadoCarrera);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    await estadoCarrera.save();
    res.status(201).json({ message: 'Estado de Carrera creado' });
  });

  static getById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const estadoCarrera = await EstadoCarrera.findOneOrFail(id);
    res.send(estadoCarrera);
  });

  static edit = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    let estadoCarrera = await EstadoCarrera.findOneOrFail(id);
    estadoCarrera.nombre = nombre;
    estadoCarrera.descripcion = descripcion;
    const errors = await validate(estadoCarrera);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    await estadoCarrera.save();
    res.status(200).json({ message: 'Estado de Carrera modificado' });
  });

  static delete = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    let estadoCarrera = await EstadoCarrera.findOneOrFail(id);
    estadoCarrera.remove();
    res.status(200).json({ message: 'Estado de Carrera eliminado' });
  });

}