import { Request, Response } from 'express';
import { Pais } from '../entity/Pais';
import { validate } from 'class-validator';
import { catchAsync } from '../utils/catchAsync';

export class PaisController {

  static getAll = catchAsync(async (req: Request, res: Response) => {
    const paises = await Pais.find();
    if (paises.length > 0) {
      res.send(paises);
    } else {
      res.status(404).json({ message: 'No se han encontrado resultados' });
    }
  });

  static add = catchAsync(async (req: Request, res: Response) => {
    const { nombre, abreviatura, codigo } = req.body;
    const pais = new Pais();
    pais.nombre = nombre;
    pais.abreviatura = abreviatura;
    pais.codigo = codigo;
    const errors = await validate(pais);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    await pais.save();
    res.status(201).json({ message: 'Pais creado' });
  });

  static getById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const pais = await Pais.findOneOrFail(id);
    res.send(pais);
  });

  static edit = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nombre, abreviatura, codigo } = req.body;
    let pais = await Pais.findOneOrFail(id);
    pais.nombre = nombre;
    pais.abreviatura = abreviatura;
    pais.codigo = codigo;
    const errors = await validate(pais);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    await pais.save();
    res.status(200).json({ message: 'Pais modificado' });
  });

  static delete = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    let pais = await Pais.findOneOrFail(id);
    pais.remove();
    res.status(200).json({ message: 'Pais eliminado' });
  });

}