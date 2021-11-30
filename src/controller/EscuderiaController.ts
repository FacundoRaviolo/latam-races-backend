import { Request, Response } from 'express';
import { Escuderia } from '../entity/Escuderia';
import { validate } from 'class-validator';
import { catchAsync } from '../utils/catchAsync';
import { Pais } from '../entity/Pais';
import { Categoria } from '../entity/Categoria';
import { getRepository } from 'typeorm';

export class EscuderiaController {

  static getAll = catchAsync(async (req: Request, res: Response) => {
    const escuderias = await Escuderia.find({ order: { id: 'ASC' } });
    if (escuderias.length > 0) {
      res.send(escuderias);
    } else {
      res.status(404).json({ message: 'No se han encontrado resultados' });
    }
  });

  static add = catchAsync(async (req: Request, res: Response) => {
    const { nombre, abreviatura, escudo, nacionalidad, categoria, historial } = req.body;
    const escuderia = new Escuderia();
    escuderia.nombre = nombre;
    escuderia.abreviatura = abreviatura;
    escuderia.escudo = escudo;
    escuderia.nacionalidad = await Pais.findOneOrFail(nacionalidad);
    escuderia.categoria = await Categoria.findOneOrFail(categoria);
    escuderia.historial = historial;
    const errors = await validate(escuderia);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    await escuderia.save();
    res.status(201).json({ message: 'Escuderia creada' });
  });

  static getById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const escuderia = await Escuderia.findOneOrFail(id);
    res.send(escuderia);
  });

  static edit = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nombre, abreviatura, escudo, nacionalidad, categoria, historial } = req.body;
    let escuderia = await Escuderia.findOneOrFail(id);
    escuderia.nombre = nombre;
    escuderia.abreviatura = abreviatura;
    escuderia.escudo = escudo;
    escuderia.nacionalidad = await Pais.findOneOrFail(nacionalidad);
    escuderia.categoria = await Categoria.findOneOrFail(categoria);
    escuderia.historial = historial;
    const errors = await validate(escuderia);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    await escuderia.save();
    res.status(200).json({ message: 'Escuderia modificada' });
  });

  static delete = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    let escuderia = await Escuderia.findOneOrFail(id);
    escuderia.remove();
    res.status(200).json({ message: 'Escuderia eliminada' });
  });

  static getHistorial = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const escuderia = await Escuderia.findOneOrFail(id);
    const historial = await escuderia.historial;
    res.send(historial);
  });

}