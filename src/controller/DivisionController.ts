import { Request, Response } from 'express';
import { Division } from '../entity/Division';
import { validate } from 'class-validator';
import { catchAsync } from '../utils/catchAsync';
import { Categoria } from '../entity/Categoria';
import { Plataforma } from '../entity/Plataforma';

export class DivisionController {

  static getAll = catchAsync(async (req: Request, res: Response) => {
    const divisiones = await Division.find({ order: { id: 'ASC' } });
    if (divisiones.length > 0) {
      res.send(divisiones);
    } else {
      res.status(404).json({ message: 'No se han encontrado resultados' });
    }
  });

  static add = catchAsync(async (req: Request, res: Response) => {
    const { nombre, descripcion, logo, categoria, plataforma } = req.body;
    const division = new Division();
    division.nombre = nombre;
    division.descripcion = descripcion;
    division.logo = logo;
    if (categoria) {
      division.categoria = await Categoria.findOneOrFail({ id: categoria });
    }
    if (plataforma) {
      division.plataforma = await Plataforma.findOneOrFail({ id: plataforma });
    }
    const errors = await validate(division);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    await division.save();
    res.status(201).json({ message: 'Division creada' });
  });

  static getById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const division = await Division.findOneOrFail(id);
    res.send(division);
  });

  static edit = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nombre, descripcion, logo, categoria, plataforma } = req.body;
    let division = await Division.findOneOrFail(id);
    division.nombre = nombre;
    division.descripcion = descripcion;
    division.logo = logo;
    if (categoria) {
      division.categoria = await Categoria.findOneOrFail({ id: categoria });
    }
    if (plataforma) {
      division.plataforma = await Plataforma.findOneOrFail({ id: plataforma });
    }
    const errors = await validate(division);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    await division.save();
    res.status(200).json({ message: 'Division modificada' });
  });

  static delete = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    let division = await Division.findOneOrFail(id);
    division.remove();
    res.status(200).json({ message: 'Division eliminada' });
  });

}