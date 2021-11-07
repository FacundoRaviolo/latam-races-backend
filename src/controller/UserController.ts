import { Request, Response } from 'express';
import { User } from '../entity/User';
import { validate } from 'class-validator';
import { catchAsync } from '../utils/catchAsync';

export class UserController {

  static getAll = catchAsync(async (req: Request, res: Response) => {
    const users = await User.find({ order: { id: 'ASC' } });
    if (users.length > 0) {
      res.send(users);
    } else {
      res.status(404).json({ message: 'No se han encontrado resultados' });
    }
  });

  static add = catchAsync(async (req: Request, res: Response) => {
    const { username, email, password, role } = req.body;
    const user = new User();
    user.username = username;
    user.email = email;
    user.password = password;
    user.role = role;
    const errors = await validate(user);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    user.hashPassword();
    await user.save();
    res.status(201).json({ message: 'Usuario creado' });
  });

  static getById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findOneOrFail(id);
    res.send(user);
  });

  static edit = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, email, role } = req.body;
    let user = await User.findOneOrFail(id);
    user.username = username;
    user.email = email;
    user.role = role;
    const errors = await validate(user);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    await user.save();
    res.status(200).json({ message: 'Usuario modificado' });
  });

  static delete = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    let user = await User.findOneOrFail(id);
    user.remove();
    res.status(200).json({ message: 'Usuario eliminado' });
  });

}
