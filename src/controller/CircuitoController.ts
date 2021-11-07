import { Request, Response } from 'express';
import { Circuito } from '../entity/Circuito';
import { validate } from 'class-validator';
import { catchAsync } from '../utils/catchAsync';
import { Pais } from '../entity/Pais';

export class CircuitoController {

  static getAll = catchAsync(async (req: Request, res: Response) => {
    const circuitos = await Circuito.find({ order: { id: 'ASC' } });
    if (circuitos.length > 0) {
      res.send(circuitos);
    } else {
      res.status(404).json({ message: 'No se han encontrado resultados' });
    }
  });

  static add = catchAsync(async (req: Request, res: Response) => {
    const { nombre, nombreCompleto, ciudad, pais } = req.body;
    const circuito = new Circuito();
    circuito.nombre = nombre;
    circuito.nombreCompleto = nombreCompleto;
    circuito.ciudad = ciudad;
    // TODO: INCORPORAR ESTO EN CADA FIND DE ESTE TIPO
    if (pais) {
      circuito.pais = await Pais.findOneOrFail({ id: pais });
    }
    const errors = await validate(circuito);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    await circuito.save();
    res.status(201).json({ message: 'Circuito creado' });
  });

  static getById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const circuito = await Circuito.findOneOrFail(id);
    res.send(circuito);
  });

  static edit = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nombre, nombreCompleto, ciudad, pais } = req.body;
    let circuito = await Circuito.findOneOrFail(id);
    circuito.nombre = nombre;
    circuito.nombreCompleto = nombreCompleto;
    circuito.ciudad = ciudad;
    if (pais) {
      circuito.pais = await Pais.findOneOrFail({ id: pais });
    }
    const errors = await validate(circuito);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    await circuito.save();
    res.status(200).json({ message: 'Circuito modificado' });
  });

  static delete = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    let circuito = await Circuito.findOneOrFail(id);
    circuito.remove();
    res.status(200).json({ message: 'Circuito eliminado' });
  });

}