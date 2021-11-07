import { Request, Response } from 'express';
import { Categoria } from '../entity/Categoria';
import { validate } from 'class-validator';
import { catchAsync } from '../utils/catchAsync';

export class CategoriaController {

  static getAll = catchAsync(async (req: Request, res: Response) => {
    const categorias = await Categoria.find({ order: { id: 'ASC' } });
    if (categorias.length > 0) {
      res.send(categorias);
    } else {
      res.status(404).json({ message: 'No se han encontrado resultados' });
    }
  });

  static add = catchAsync(async (req: Request, res: Response) => {
    const { nombre, abreviatura, descripcion, logo } = req.body;
    const categoria = new Categoria();
    categoria.nombre = nombre;
    categoria.abreviatura = abreviatura;
    categoria.descripcion = descripcion;
    categoria.logo = logo;
    const errors = await validate(categoria);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    await categoria.save();
    res.status(201).json({ message: 'Categoria creada' });
  });

  static getById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const categoria = await Categoria.findOneOrFail(id);
    res.send(categoria);
  });

  static edit = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nombre, abreviatura, descripcion, logo } = req.body;
    let categoria = await Categoria.findOneOrFail(id);
    categoria.nombre = nombre;
    categoria.abreviatura = abreviatura;
    categoria.descripcion = descripcion;
    categoria.logo = logo;
    const errors = await validate(categoria);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    await categoria.save();
    res.status(200).json({ message: 'Categoria modificada' });
  });

  static delete = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    let categoria = await Categoria.findOneOrFail(id);
    categoria.remove();
    res.status(200).json({ message: 'Categoria eliminada' });
  });

}