import { Request, Response } from 'express';
import { MotivoPenalizacion } from '../entity/MotivoPenalizacion';
import { validate } from 'class-validator';
import { catchAsync } from '../utils/catchAsync';

export class MotivoPenalizacionController {

  static getAll = catchAsync(async (req: Request, res: Response) => {
    const motivosPenalizacion = await MotivoPenalizacion.find({ order: { id: 'ASC' } });
    if (motivosPenalizacion.length > 0) {
      res.send(motivosPenalizacion);
    } else {
      res.status(404).json({ message: 'No se han encontrado resultados' });
    }
  });

  static add = catchAsync(async (req: Request, res: Response) => {
    const { nombre } = req.body;
    const motivoPenalizacion = new MotivoPenalizacion();
    motivoPenalizacion.nombre = nombre;
    const errors = await validate(motivoPenalizacion);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    await motivoPenalizacion.save();
    res.status(201).json({ message: 'Motivo de Penalizacion creado' });
  });

  static getById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const motivoPenalizacion = await MotivoPenalizacion.findOneOrFail(id);
    res.send(motivoPenalizacion);
  });

  static edit = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nombre } = req.body;
    let motivoPenalizacion = await MotivoPenalizacion.findOneOrFail(id);
    motivoPenalizacion.nombre = nombre;
    const errors = await validate(motivoPenalizacion);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    await motivoPenalizacion.save();
    res.status(200).json({ message: 'Motivo de Penalizacion modificado' });
  });

  static delete = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    let motivoPenalizacion = await MotivoPenalizacion.findOneOrFail(id);
    motivoPenalizacion.remove();
    res.status(200).json({ message: 'MotivoPenalizacion eliminado' });
  });

}