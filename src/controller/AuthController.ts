import { Request, Response } from 'express';
import { User } from '../entity/User';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';

export class AuthController {

  static login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!(username && password)) {
      return res.status(400).json({ message: 'Usuario y contraseña son requeridos' });
    }

    let user: User;

    try {
      user = await User.findOneOrFail({ where: { username } });
    } catch (e) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }

    if (!user.checkPassword(password)) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }

    const token = jwt.sign({ userId: user.id, username: user.username }, config.jwtSecret, { expiresIn: '1h' });

    res.json({ message: 'OK', token });
  }

}