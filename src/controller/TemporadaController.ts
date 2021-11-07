import { Request, Response } from 'express';
import { Temporada } from '../entity/Temporada';
import { validate } from 'class-validator';
import { catchAsync } from '../utils/catchAsync';
import { Division } from '../entity/Division';
import { Piloto } from '../entity/Piloto';
import { Escuderia } from '../entity/Escuderia';

export class TemporadaController {

  static getAll = catchAsync(async (req: Request, res: Response) => {
    const temporadas = await Temporada.find({ order: { id: 'ASC' } });
    if (temporadas.length > 0) {
      res.send(temporadas);
    } else {
      res.status(404).json({ message: 'No se han encontrado resultados' });
    }
  });

  static add = catchAsync(async (req: Request, res: Response) => {
    const { nombre, fechaInicio, fechaFin, division, pilotos, escuderias } = req.body;
    const temporada = new Temporada();
    temporada.nombre = nombre;
    temporada.fechaInicio = fechaInicio;
    temporada.fechaFin = fechaFin;
    if (division) {
      temporada.division = await Division.findOneOrFail({ id: division });
    }
    if (pilotos) {
      temporada.pilotos = await Piloto.findByIds(pilotos);
    }
    if (escuderias) {
      temporada.escuderias = await Escuderia.findByIds(escuderias);
    }
    const errors = await validate(temporada);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    await temporada.save();
    res.status(201).json({ message: 'Temporada creada' });
  });

  static getById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const temporada = await Temporada.findOneOrFail(id);
    res.send(temporada);
  });

  static edit = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nombre, fechaInicio, fechaFin, division, pilotos, escuderias } = req.body;
    let temporada = await Temporada.findOneOrFail(id);
    temporada.nombre = nombre;
    temporada.fechaInicio = fechaInicio;
    temporada.fechaFin = fechaFin;
    if (division) {
      temporada.division = await Division.findOneOrFail({ id: division });
    }
    if (pilotos) {
      temporada.pilotos = await Piloto.findByIds(pilotos);
    }
    if (escuderias) {
      temporada.escuderias = await Escuderia.findByIds(escuderias);
    }
    const errors = await validate(temporada);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    await temporada.save();
    res.status(200).json({ message: 'Temporada modificada' });
  });

  static delete = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    let temporada = await Temporada.findOneOrFail(id);
    temporada.remove();
    res.status(200).json({ message: 'Temporada eliminada' });
  });

}