import { Request, Response } from 'express';
import { Piloto } from '../entity/Piloto';
import { validate } from 'class-validator';
import { catchAsync } from '../utils/catchAsync';
import { Pais } from '../entity/Pais';

export class PilotoController {

  static getAll = catchAsync(async (req: Request, res: Response) => {
    const pilotos = await Piloto.find({ order: { id: 'ASC' } });
    if (pilotos.length > 0) {
      res.send(pilotos);
    } else {
      res.status(404).json({ message: 'No se han encontrado resultados' });
    }
  });

  static add = catchAsync(async (req: Request, res: Response) => {
    const { usuario, nombre, apellido, abreviatura, email, idSteam, idDiscord, 
      fechaNacimiento, fechaRegistro, ciudad, provincia, nacionalidad } = req.body;
    const piloto = new Piloto();
    piloto.usuario = usuario;
    piloto.nombre = nombre;
    piloto.apellido = apellido;
    piloto.abreviatura = abreviatura;
    piloto.email = email;
    piloto.idSteam = idSteam;
    piloto.idDiscord = idDiscord;
    piloto.fechaNacimiento = fechaNacimiento;
    piloto.fechaRegistro = fechaRegistro;
    piloto.ciudad = ciudad;
    piloto.provincia = provincia;
    if (nacionalidad) {
      piloto.nacionalidad = await Pais.findOneOrFail({ id: nacionalidad });
    }
    const errors = await validate(piloto);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    await piloto.save();
    res.status(201).json({ message: 'Piloto creado' });
  });

  static getById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const piloto = await Piloto.findOneOrFail(id);
    res.send(piloto);
  });

  static edit = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { usuario, nombre, apellido, abreviatura, email, idSteam, idDiscord, 
      fechaNacimiento, fechaRegistro, ciudad, provincia, nacionalidad } = req.body;
    let piloto = await Piloto.findOneOrFail(id);
    piloto.usuario = usuario;
    piloto.nombre = nombre;
    piloto.apellido = apellido;
    piloto.abreviatura = abreviatura;
    piloto.email = email;
    piloto.idSteam = idSteam;
    piloto.idDiscord = idDiscord;
    piloto.fechaNacimiento = fechaNacimiento;
    piloto.fechaRegistro = fechaRegistro;
    piloto.ciudad = ciudad;
    piloto.provincia = provincia;
    if (nacionalidad) {
      piloto.nacionalidad = await Pais.findOneOrFail({ id: nacionalidad });
    }
    const errors = await validate(piloto);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    await piloto.save();
    res.status(200).json({ message: 'Piloto modificado' });
  });

  static delete = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    let piloto = await Piloto.findOneOrFail(id);
    piloto.remove();
    res.status(200).json({ message: 'Piloto eliminado' });
  });

}