import { Request, Response } from 'express';
import { Evento } from '../entity/Evento';
import { validate } from 'class-validator';
import { catchAsync } from '../utils/catchAsync';
import { Circuito } from '../entity/Circuito';
import { EstadoEvento } from '../entity/EstadoEvento';
import { Piloto } from '../entity/Piloto';
import { Temporada } from '../entity/Temporada';

export class EventoController {

  static getAll = catchAsync(async (req: Request, res: Response) => {
    const eventos = await Evento.find({ order: { id: 'ASC' } });
    if (eventos.length > 0) {
      res.send(eventos);
    } else {
      res.status(404).json({ message: 'No se han encontrado resultados' });
    }
  });

  static add = catchAsync(async (req: Request, res: Response) => {
    const { numero, nombre, fecha, circuito, estado, pilotoDelDia, sesiones, temporada } = req.body;
    const evento = new Evento();
    evento.numero = numero;
    evento.nombre = nombre;
    evento.fecha = fecha;
    if (circuito) {
      evento.circuito = await Circuito.findOneOrFail({ id: circuito });
    }
    if (estado) {
      evento.estado = await EstadoEvento.findOneOrFail({ id: estado });
    }
    if (pilotoDelDia) {
      evento.pilotoDelDia = await Piloto.findOneOrFail({ id: pilotoDelDia });
    }
    if (temporada) {
      evento.temporada = await Temporada.findOneOrFail({ id: temporada });
    }
    evento.sesiones = sesiones;
    const errors = await validate(evento);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    await evento.save();
    res.status(201).json({ message: 'Evento creado' });
  });

  static getById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const evento = await Evento.findOneOrFail(id);
    res.send(evento);
  });

  static edit = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { numero, nombre, fecha, circuito, estado, pilotoDelDia, sesiones, temporada } = req.body;
    let evento = await Evento.findOneOrFail(id);
    evento.numero = numero;
    evento.nombre = nombre;
    evento.fecha = fecha;
    if (circuito) {
      evento.circuito = await Circuito.findOneOrFail({ id: circuito });
    }
    if (estado) {
      evento.estado = await EstadoEvento.findOneOrFail({ id: estado });
    }
    if (pilotoDelDia) {
      evento.pilotoDelDia = await Piloto.findOneOrFail({ id: pilotoDelDia });
    }
    if (temporada) {
      evento.temporada = await Temporada.findOneOrFail({ id: temporada });
    }
    const errors = await validate(evento);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    await evento.save();
    res.status(200).json({ message: 'Evento modificado' });
  });

  static delete = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    let evento = await Evento.findOneOrFail(id);
    evento.remove();
    res.status(200).json({ message: 'Evento eliminado' });
  });

}