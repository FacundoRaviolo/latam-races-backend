import { Request, Response } from 'express';
import { EstadoEvento } from '../entity/EstadoEvento';
import { validate } from 'class-validator';
import { catchAsync } from '../utils/catchAsync';

export class EstadoEventoController {

  static getAll = catchAsync(async (req: Request, res: Response) => {
    const estadosEvento = await EstadoEvento.find({ order: { id: 'ASC' } });
    if (estadosEvento.length > 0) {
      res.send(estadosEvento);
    } else {
      res.status(404).json({ message: 'No se han encontrado resultados' });
    }
  });

  static add = catchAsync(async (req: Request, res: Response) => {
    const { nombre, descripcion } = req.body;
    const estadoEvento = new EstadoEvento();
    estadoEvento.nombre = nombre;
    estadoEvento.descripcion = descripcion;
    const errors = await validate(estadoEvento);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    await estadoEvento.save();
    res.status(201).json({ message: 'Estado de Evento creado' });
  });

  static getById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const estadoEvento = await EstadoEvento.findOneOrFail(id);
    res.send(estadoEvento);
  });

  static edit = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    let estadoEvento = await EstadoEvento.findOneOrFail(id);
    estadoEvento.nombre = nombre;
    estadoEvento.descripcion = descripcion;
    const errors = await validate(estadoEvento);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    await estadoEvento.save();
    res.status(200).json({ message: 'Estado de Evento modificado' });
  });

  static delete = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    let estadoEvento = await EstadoEvento.findOneOrFail(id);
    estadoEvento.remove();
    res.status(200).json({ message: 'Estado de Evento eliminado' });
  });

}