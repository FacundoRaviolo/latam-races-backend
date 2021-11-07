import { Request, Response } from 'express';
import { Contrato } from '../entity/Contrato';
import { validate } from 'class-validator';
import { catchAsync } from '../utils/catchAsync';
import { Piloto } from '../entity/Piloto';
import { Escuderia } from '../entity/Escuderia';
import { Temporada } from '../entity/Temporada';

export class ContratoController {

  static getAll = catchAsync(async (req: Request, res: Response) => {
    const contratos = await Contrato.find({ order: { id: 'ASC' } });
    if (contratos.length > 0) {
      res.send(contratos);
    } else {
      res.status(404).json({ message: 'No se han encontrado resultados' });
    }
  });

  static add = catchAsync(async (req: Request, res: Response) => {
    const { numero, foto, piloto, escuderia, fechaInicio, fechaFin, activo, temporada } = req.body;
    const contrato = new Contrato();
    contrato.numero = numero;
    contrato.foto = foto;
    contrato.fechaInicio = fechaInicio;
    contrato.fechaFin = fechaFin;
    contrato.activo = activo;
    if (piloto) {
      contrato.piloto = await Piloto.findOneOrFail({ id: piloto });
    }
    if (escuderia) {
      contrato.escuderia = await Escuderia.findOneOrFail({ id: escuderia });
    }
    if (temporada) {
      contrato.temporada = await Temporada.findOneOrFail({ id: temporada });
    }
    const errors = await validate(contrato);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    await contrato.save();
    res.status(201).json({ message: 'Contrato creado' });
  });

  static getById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const contrato = await Contrato.findOneOrFail(id);
    res.send(contrato);
  });

  static edit = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { numero, foto, piloto, escuderia, fechaInicio, fechaFin, activo, temporada } = req.body;
    let contrato = await Contrato.findOneOrFail(id);
    contrato.numero = numero;
    contrato.foto = foto;
    contrato.fechaInicio = fechaInicio;
    contrato.fechaFin = fechaFin;
    contrato.activo = activo;
    if (piloto) {
      contrato.piloto = await Piloto.findOneOrFail({ id: piloto });
    }
    if (escuderia) {
      contrato.escuderia = await Escuderia.findOneOrFail({ id: escuderia });
    }
    if (temporada) {
      contrato.temporada = await Temporada.findOneOrFail({ id: temporada });
    }
    const errors = await validate(contrato);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    await contrato.save();
    res.status(200).json({ message: 'Contrato modificado' });
  });

  static delete = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    let contrato = await Contrato.findOneOrFail(id);
    contrato.remove();
    res.status(200).json({ message: 'Contrato eliminado' });
  });

}