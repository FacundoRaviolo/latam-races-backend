import { Request, Response } from 'express';
import { Neumatico } from '../entity/Neumatico';
import { validate } from 'class-validator';
import { catchAsync } from '../utils/catchAsync';
import { Categoria } from '../entity/Categoria';

export class NeumaticoController {

  static getAll = catchAsync(async (req: Request, res: Response) => {
    const neumaticos = await Neumatico.find({ order: { id: 'ASC' } });
    if (neumaticos.length > 0) {
      res.send(neumaticos);
    } else {
      res.status(404).json({ message: 'No se han encontrado resultados' });
    }
  });

  static add = catchAsync(async (req: Request, res: Response) => {
    const { nombre, abreviatura, imagen, color, categoria } = req.body;
    const neumatico = new Neumatico();
    neumatico.nombre = nombre;
    neumatico.abreviatura = abreviatura;
    neumatico.imagen = imagen;
    neumatico.color = color;
    if (categoria) {
      neumatico.categoria = await Categoria.findOneOrFail({ id: categoria });
    }
    const errors = await validate(neumatico);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    await neumatico.save();
    res.status(201).json({ message: 'Neumatico creado' });
  });

  static getById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const neumatico = await Neumatico.findOneOrFail(id);
    res.send(neumatico);
  });

  static edit = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nombre, abreviatura, imagen, color, categoria } = req.body;
    let neumatico = await Neumatico.findOneOrFail(id);
    neumatico.nombre = nombre;
    neumatico.abreviatura = abreviatura;
    neumatico.imagen = imagen;
    neumatico.color = color;
    if (categoria) {
      neumatico.categoria = await Categoria.findOneOrFail({ id: categoria });
    }
    const errors = await validate(neumatico);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    await neumatico.save();
    res.status(200).json({ message: 'Neumatico modificado' });
  });

  static delete = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    let neumatico = await Neumatico.findOneOrFail(id);
    neumatico.remove();
    res.status(200).json({ message: 'Neumatico eliminado' });
  });

}